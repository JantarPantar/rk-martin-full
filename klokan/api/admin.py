from django.contrib import admin
from django.forms import ModelForm
from django import forms
from django.utils.safestring import mark_safe
from .models import Property, PropertyImage
class MapWidget(forms.Widget):    
    def render(self, name, value, attrs=None, renderer=None):        
        html = f'''
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        
        <div id="map-container" style="margin: 20px 0;">
            <div style="margin-bottom: 10px;">
                <input type="text" 
                       id="address-search" 
                       placeholder="Vyhledat adresu"
                       style="width: 70%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                <button type="button" 
                        id="search-btn" 
                        style="padding: 8px 15px; margin-left: 5px; background: #007cba; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Hledat
                </button>
            </div>
            <div id="map" style="height: 400px; width: 100%; border: 1px solid #ccc;"></div>
            <p style="margin-top: 10px; color: #666;">
                Klikněte na mapu nebo vyhledejte adresu. Aktuální pozice: 
                <span id="coords-display">Nevybráno</span>
            </p>
        </div>
        
        <script>
        django.jQuery(document).ready(function($) {{
            console.log('Map widget initializing...');
            
            const defaultLat = 50.0755;
            const defaultLng = 14.4378;
            
            //    jQuery
            const latField = $('input[name="latitude"]').first();
            const lngField = $('input[name="longtitude"]').first();
            
            console.log('Found latitude field:', latField.length > 0 ? 'YES' : 'NO');
            console.log('Found longitude field:', lngField.length > 0 ? 'YES' : 'NO');
            
            if (latField.length > 0) console.log('Lat field value:', latField.val());
            if (lngField.length > 0) console.log('Lng field value:', lngField.val());
            
            let currentLat = latField.length > 0 && latField.val() ? parseFloat(latField.val()) : defaultLat;
            let currentLng = lngField.length > 0 && lngField.val() ? parseFloat(lngField.val()) : defaultLng;
            
            // Inicializace mapy
            const map = L.map('map').setView([currentLat, currentLng], 10);
            
            // tile layer
            L.tileLayer('https://{{s}}.tile.openstreetmap.org/{{z}}/{{x}}/{{y}}.png', {{
                attribution: '© OpenStreetMap contributors'
            }}).addTo(map);
            
            let marker = null;
            
            if (latField.length > 0 && lngField.length > 0 && latField.val() && lngField.val()) {{
                marker = L.marker([currentLat, currentLng], {{
                    draggable: true
                }}).addTo(map);
                
                updateCoordDisplay(currentLat, currentLng);
                
                marker.on('dragend', function(event) {{
                    const pos = marker.getLatLng();
                    updateFields(pos.lat, pos.lng);
                }});
            }}
            
            // Listener
            map.on('click', function(e) {{
                console.log('Map clicked:', e.latlng.lat, e.latlng.lng);
                const lat = e.latlng.lat;
                const lng = e.latlng.lng;
                
                if (marker) {{
                    map.removeLayer(marker);
                }}
                
                marker = L.marker([lat, lng], {{
                    draggable: true
                }}).addTo(map);
                
                updateFields(lat, lng);
                
                marker.on('dragend', function(event) {{
                    const pos = marker.getLatLng();
                    updateFields(pos.lat, pos.lng);
                }});
            }});
            
            // vyhledani adres
            $('#search-btn').on('click', searchAddress);
            
            $('#address-search').on('keypress', function(e) {{
                if (e.which === 13) {{ 
                    e.preventDefault();
                    searchAddress();
                }}
            }});
            
            function searchAddress() {{
                const address = $('#address-search').val().trim();
                if (!address) return;
                
                console.log('Searching for:', address);
                
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${{encodeURIComponent(address)}}&countrycodes=cz&limit=1`;
                
                $('#search-btn').text('Hledám...').prop('disabled', true);
                
                $.getJSON(url)
                    .done(function(data) {{
                        console.log('Search results:', data);
                        if (data && data.length > 0) {{
                            const result = data[0];
                            const lat = parseFloat(result.lat);
                            const lng = parseFloat(result.lon);
                            
                            map.setView([lat, lng], 15);
                            
                            if (marker) {{
                                map.removeLayer(marker);
                            }}
                            
                            marker = L.marker([lat, lng], {{
                                draggable: true
                            }}).addTo(map);
                            
                            updateFields(lat, lng);
                            
                            marker.on('dragend', function(event) {{
                                const pos = marker.getLatLng();
                                updateFields(pos.lat, pos.lng);
                            }});
                            
                        }} else {{
                            alert('unknown address');
                        }}
                    }})
                    .fail(function(jqxhr, textStatus, error) {{
                        console.error('Search error:', textStatus, error);
                        alert('Err');
                    }})
                    .always(function() {{
                        $('#search-btn').text('Hledat').prop('disabled', false);
                    }});
            }}
            
            function updateFields(lat, lng) {{
                console.log('Updating fields with:', lat, lng);
                
                if (latField.length > 0) {{
                    latField.val(lat.toFixed(6));
                    latField.trigger('change');
                    console.log('Latitude updated to:', latField.val());
                }} else {{
                    console.error('Latitude field not found!');
                }}
                
                if (lngField.length > 0) {{
                    lngField.val(lng.toFixed(6));
                    lngField.trigger('change');
                    console.log('Longitude updated to:', lngField.val());
                }} else {{
                    console.error('Longitude field not found!');
                }}
                
                updateCoordDisplay(lat, lng);
            }}
            
            function updateCoordDisplay(lat, lng) {{
                $('#coords-display').text(`${{lat.toFixed(6)}}, ${{lng.toFixed(6)}}`);
            }}
        }});
        </script>
        '''
        
        return mark_safe(html)

class PropertyAdminForm(ModelForm):
    map_selector = forms.CharField(
        required=False,
        widget=MapWidget(),
        help_text="Vyhledejte adresu nebo klikněte na mapu pro výběr pozice"
    )
    
    class Meta:
        model = Property
        fields = '__all__'
class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1
@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    form = PropertyAdminForm
    inlines = [PropertyImageInline]
    fieldsets = (
        (None, {
            'fields': ('title', 'state', 'type', 'visibility_level', 'street', 'city', 'map_selector', 'longtitude', 'latitude', 'size_m2', 'energy_rating', 'price', 'description')
        }),
    )