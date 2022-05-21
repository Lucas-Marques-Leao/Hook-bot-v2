import { PostgresSource } from "./database/data-source";
import { Ficha } from "./models/Ficha";
import { User } from "./models/User";

PostgresSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 24
    await PostgresSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await PostgresSource.manager.find(User)
    const fichas = await PostgresSource.manager.find(Ficha)

    console.log("Loaded users: ", users)
    console.log("Fichas carregadas: ", fichas)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
