# bookshelf-api
Sebuah api untuk menyimpan data buku

Menggunakan HAPI FRAMEWORK api ini dapat menyimpan data buku tanpa menggunakan data base, akan tetapi menggunakan server session sebagai penyimpanan


# Routes 

1. List Buku 
   GET : '/books'
   
   - Menggunakan GET untuk mengambil semua data buku di server session
   - Anda bisa menambahkan query spesifik untuk mendapatkan data tertentu
   
     ?name=String
     - Untuk mendapatkan data berdasarkan nama buku
     
     ?finished=1
     - Untuk mendapatkan data yang sudah selesai dibaca
     
     ?reading=1
     - Untuk mendapatkan data buku yang sedang dibaca

2. Menambahkan Buku
   POST : '/books'
   
   - Menggunankan POST untuk menambahkan sebuah data buku ke dalam session server
   - Contoh JSON yang dikirim 
     { 
        name: String, 
        year: Number, 
        author: String, 
        summary: String , 
        publisher: String, 
        pageCount: Number, 
        readPage: Number, 
        reading: Boolean 
      }
      
3. Edit Buku
   PUT : '/books/{bookId}
   
   - Menggunankan PUT untuk mengubah sebuah data buku di dalam session server
   - Contoh JSON yang dikirim 
     { 
        name: String, 
        year: Number, 
        author: String, 
        summary: String , 
        publisher: String, 
        pageCount: Number, 
        readPage: Number, 
        reading: Boolean 
      }
      
4. Mengambil Sebuah Buku
   GET : '/books/{bookId}'
   
   - Menggunakan GET untuk mengambil sebuah data buku di server session
