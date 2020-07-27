
export class User {

    /**
     * Crea una instancia de User con la información de Firestore.
     * @param uid es el identificador del usuario en Firebase.
     * @param name es el nombre del usuario.
     * @param mail es el correo electrónico del usuario.
     */
    static fromFirebase({ uid, name, mail }): User {
        return new User(uid, name, mail);
    }

    constructor(
        public uid: string,
        public name: string,
        public mail: string,
    ) { }
}
