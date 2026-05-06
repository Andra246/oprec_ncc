# Penugasan 2

Nama: Mayandra Suhaira Frisiandi  
NRP: 5025241240

## Deskripsi Pipeline

Pipeline dibuat menggunakan Jenkins Pipeline (Jenkinsfile) untuk mengotomatisasi proses build, testing, dan analisis kualitas kode menggunakan SonarQube.

Pipeline terdiri dari beberapa tahap:

1. Checkout source code dari GitHub repository
2. Build project (simulasi build)
3. Test stage (simulasi testing)
4. Static code analysis menggunakan SonarQube
5. Quality Gate validation untuk menentukan apakah pipeline berhasil atau gagal

Pipeline menggunakan Quality Gate dari SonarQube untuk menentukan status keberhasilan berdasarkan hasil analisis kode.

## Integrasi Jenkins dengan SonarQube

Integrasi dilakukan untuk menghubungkan Jenkins dengan code quality analysis SonarQube.

### Jenkins

Jenkins URL diatur menjadi:
``
http://jenkins-blueocean:8080
``

dan pada konfigurasi SonarQube Server pada jenkins:

``
Name: sonarserver
URL: http://sonarqube:9000
``
Jenkins menggunakan credential (Token SonarQube) untuk authentication saat menjalankan scanner.

### SonarQube

Quality Gate di Jenkins digunakan untuk memastikan hasil analisis dari SonarQube memenuhi standar kualitas yang telah ditentukan oleh default Quality Gate (Sonar way).
Pada implementasi ini digunakan konfigurasi bawaan SonarQube karena tidak dilakukan custom rule atau threshold tambahan.

Webhook digunakan untuk menghubungkan SonarQube ke Jenkins:
``
http://jenkins-blueocean:8080/sonarqube-webhook/
``
Webhook ini digunakan agar SonarQube dapat mengirim hasil analisis kembali ke Jenkins secara otomatis.

## Alur Pipeline

Alur kerja pipeline adalah sebagai berikut:
1. Developer melakukan push ke GitHub repository
2. Jenkins otomatis melakukan checkout repository
3. Jenkins menjalankan tahap build dan test
4. Jenkins menjalankan SonarQube analysis
5. SonarQube melakukan static code analysis
6. Hasil dikirim kembali ke Jenkins melalui webhook
7. Jenkins menjalankan Quality Gate check
8. Jika Quality Gate PASS, pipeline sukses
9. Jika FAIL, pipeline otomatis dihentikan

## Hasil implementasi

### Jenkins
<img width="1917" height="1004" alt="image" src="https://github.com/user-attachments/assets/b0bbd219-2ea1-4b15-a6ba-21feb9307bfe" />

### SonarQube
<img width="1919" height="1011" alt="image" src="https://github.com/user-attachments/assets/27f454db-ed96-4016-8288-c14874dc1d4e" />

Pipeline berhasil dijalankan hingga tahap Quality Gate dengan status SUCCESS, menunjukkan integrasi Jenkins dan SonarQube telah berjalan dengan baik.

## Kendala yang dihadapi

- Jenkins dan SonarQube tidak dapat saling resolve hostname awalnya
- Webhook tidak berfungsi karena network Docker belum terkoneksi
- Quality Gate sempat stuck pada status “IN_PROGRESS”
- Kesalahan konfigurasi URL webhook dan container name

Solusi:
- Menambahkan kedua container ke Docker network yang sama
  ``
  docker network connect jenkins sonarqube
  ``
- Menggunakan nama container yang benar `jenkins-blueocean`
- Memperbaiki webhook URL di SonarQube
- Restart container untuk memastikan network update



