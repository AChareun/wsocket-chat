import * as mongoose from 'mongoose';

function configureMongoConnection(dbUri: string): void {
    console.log(dbUri);
    mongoose
        .connect(dbUri, { useNewUrlParser: true })
        .then(() => {
            console.log('Connection with MongoDB established');
        })
        .catch((e) => {
            console.log(e);
        });
}

export { configureMongoConnection }
