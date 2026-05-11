# Penugasan 3

Nama: Mayandra Suhaira Frisiandi  
NRP: 5025241240

## Deskripsi Arsitektur Sistem Monitoring

Sistem monitoring dibangun menggunakan Prometheus, Grafana, dan Node expoerte yang dijalankan pada 2 virtual machine di Microsoft Azure.

1. Node Exporter
	- Mengambil data dari sistem operasi (CPU, RAM, disk, network)
	- Berjalan di masing-masing VM
	- Mengekspos data melalui port 9100

2. Prometheus
	- Mengambil data dari Node Exporter (scraping)
	- Menyimpan data dalam bentuk time-series
	- Menyediakan query menggunakan PromQL

3. Grafana
	- Mengambil data dari Prometheus
	- Menampilkan data dalam bentuk grafik/dashboard

4. Azure Virtual Machine
	- Menjadi tempat menjalankan semua service

Alur data
```
Node Exporter → Prometheus → Grafana
```

## Penjelasan Integrasi Prometheus dengan Grafana

Prometheus diintegrasikan dengan Grafana sebagai data source.

Langkah integrasi:
1. Grafana diakses melalui browser
2. Masuk ke menu Connections lalu Data Sources
3. Pilih Prometheus
4. Masukkan URL Prometheus:
   ```
   http://40.81.16.129:9090
   ```
5. Klik save
   
Setelah berhasil disimpan, Grafana dapat melakukan query ke Prometheus menggunakan bahasa PromQL.

## Konfigurasi Prometheus

<img width="806" height="435" alt="image" src="https://github.com/user-attachments/assets/71d1420a-bcd0-422a-85d9-261d7eb21221" />
<img width="959" height="506" alt="image" src="https://github.com/user-attachments/assets/5f01c013-60b2-4a24-a5da-7a049fad2b49" />

## Konfigurasi Data Source di Grafana

<img width="776" height="236" alt="image" src="https://github.com/user-attachments/assets/4b9bae1c-d19d-42b9-8a1c-6678f3dfd07e" />
<img width="767" height="170" alt="image" src="https://github.com/user-attachments/assets/f12270d5-7611-4f31-980e-21c0c6bfa3e3" />

## Custom Dashboard

<img width="959" height="507" alt="image" src="https://github.com/user-attachments/assets/72eee930-3e70-4205-97a1-4eb5de12996d" />

## Penjelasan Alur Monitoring

Alur sistem monitoring berjalan sebagai berikut:

1. Node Exporter mengumpulkan data sistem dari VM (CPU, RAM, disk, network).
2. Data tersebut diekspos melalui endpoint HTTP pada port 9100.
3. Prometheus melakukan scraping data dari Node Exporter secara berkala (setiap 15 detik).
4. Prometheus menyimpan data dalam bentuk time-series database. Data disimpan sebagai time-series sehingga memungkinkan analisis perubahan metric berdasarkan waktu.
5. Grafana mengambil data dari Prometheus secara near real-time berdasarkan query PromQL.
6. Data ditampilkan dalam bentuk dashboard visual.

## Kendala yang Dihadapi

Prometheus tidak dapat berjalan akibat kesalahan penulisan pada file konfigurasi YAML (missing `s` pada `static_configs`). Masalah ini berhasil diperbaiki setelah konfigurasi diperbaiki dan service direstart.
