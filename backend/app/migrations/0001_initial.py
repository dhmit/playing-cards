# Generated by Django 4.1.3 on 2023-09-12 19:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Deck',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300, null=True)),
                ('period', models.CharField(max_length=1, null=True)),
                ('start_date', models.IntegerField(null=True)),
                ('end_date', models.IntegerField(null=True)),
                ('maker', models.CharField(max_length=30, null=True)),
                ('town', models.CharField(max_length=30, null=True)),
                ('title', models.CharField(max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tarot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lang', models.CharField(max_length=2)),
                ('number', models.IntegerField()),
                ('orientation', models.BooleanField(blank=True, null=True)),
                ('rank', models.CharField(max_length=1)),
                ('title', models.CharField(blank=True, max_length=30)),
                ('subtitle', models.CharField(blank=True, max_length=30)),
                ('pair', models.CharField(blank=True, max_length=20)),
                ('etteilla', models.CharField(blank=True, max_length=25)),
                ('quad', models.CharField(blank=True, max_length=20)),
                ('triple', models.CharField(blank=True, max_length=20)),
                ('double', models.CharField(blank=True, max_length=20)),
                ('image', models.FilePathField(null=True, path='C:\\dev\\dhmit\\french-playing-cards\\assets\\img\\cartomancy')),
            ],
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rank', models.CharField(max_length=1, null=True)),
                ('suit', models.CharField(max_length=1, null=True)),
                ('type', models.CharField(max_length=30, null=True)),
                ('back_notes', models.CharField(max_length=30, null=True)),
                ('url', models.URLField(null=True)),
                ('recto_img', models.FilePathField()),
                ('verso_img', models.FilePathField(null=True)),
                ('sort_order', models.IntegerField()),
                ('deck', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='app.deck')),
            ],
            options={
                'ordering': ['sort_order'],
                'unique_together': {('deck', 'rank', 'suit')},
            },
        ),
    ]
