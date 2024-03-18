# What's new :O
>**Note**: Sebelum nyoba fitur login regist, pastikan udah buat DB StudyBuddyDatabase pake query yg ada di folder BackendAPI, trus ganti connection string di appsettings.json. more info below
## Backend
- Backend pake ASP .NET CORE Web API tapi DB nya pake SQL Server, bukan MYSQL
- Baru ada model User dan controller UserController buat ngehandle request login & register
- **PENTING**: ganti connection string di appsettings.json buat hubungin ke database kalian
## Cara ganti connection string
- Buka visual studio, buka SQL Server Object Explorer
- Dalam SQL Server Object Explorer, buka server yg ada DB StudyBuddyDatabase, klik DB StudyBuddyDatabase, terus lihat propertiesnya
- di drop down General, cari row connection string
- copas connection stringnya, ganti "DefaultConnection" di appsettings.json
## Redux
- Redux dipake buat ngeakses informasi login user secara global.
- Jadi kek global variable gitu, ga harus nge parse informasi login user dari satu page ke page lainnya
- Implementasi redux bisa dilihat di folder redux
- Contoh penggunaan bisa diliat di src/LoginPage.tsx, src/RegisterPage.tsx, src/Home.tsx
## How to Run
- Buka visual studio, run backendnya (yg panah ijo http itu)
- Run frontendnya kyk biasa
- **Note**: Kadang emulatornya kontol, perlu matiin firewall buat bisa request ke api nya
