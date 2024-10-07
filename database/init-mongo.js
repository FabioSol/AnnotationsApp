db = db.getSiblingDB('data');

db.createCollection('annotations');

db.createUser({
    user: "backend",
    pwd: "password",
    roles: [
        {
            role: "readWrite",
            db: "data"
        }
    ]
});

print('Created user with readWrite access on data database');
