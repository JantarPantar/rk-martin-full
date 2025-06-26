#!/bin/sh

mkdir -p ./static
chmod -R 755 ./static

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Gunicorn..."
exec gunicorn klokan.wsgi:application --bind 0.0.0.0:8000