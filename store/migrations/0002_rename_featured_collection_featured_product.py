# Generated by Django 4.0.5 on 2022-07-09 09:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='collection',
            old_name='featured',
            new_name='featured_product',
        ),
    ]