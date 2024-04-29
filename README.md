# BREAKING NEWS
- Versi ini ***GA ADA APP BUAT BACKEND SAMSEK***, jadi langsung ngotak ngatik react nativenya doang :D
- Databasenya udah dipindah ke supabase, jadi database yg dipake buat development ini shared & bisa diakses siapapun https://supabase.com/dashboard/project/tqiixohvighfwvmhabhj

## Positive changes:
- GAMPANG BANGET modif data dlm database (kek pake excel doang)
- Bisa langsung fokus ngoding di react native, ASP .NET API nya hapus aja
- Lebih gampang dimengerti (imo) karena syntax buat ngeakses API supabasenya sederhana
## Negative changes:
- Perubahan database jadi serem krn bisa ngerusak cara kerja app yg dikerjain dev lain
- Ga bisa ngebranching databasenya, jadi kalo mw ngetes perubahan harus buat database supabase kalian masing2
- Kalo pake API sebelumnya, beberapa proses (misal kek kodingan untuk ngehitung avg rating seorang user) bisa dicode dalem apinya. Karena kita pake built in API dari Supabase, kita g bisa ngoding proses2 tersebut, jadi proses2 tersebut harus di code dalam react nativenya (kemungkinan codingan jadi rame) (honestly tho mungkin kalo API banyak prosesnya jadi lambat & ngaruh ke performa but idk idgaf at this point)
