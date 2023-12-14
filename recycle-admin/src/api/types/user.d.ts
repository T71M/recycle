interface User {
   id: string;

   name: string;

   email: string;
}

interface LoginRequest {
   email: string;
   password: string;
}

interface RegisterRequest {
   password: string;
   name: string;
   email: string;
}
