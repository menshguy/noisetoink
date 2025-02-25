# To Run the App
## To start the backend:
source venv/bin/activate && python run.py
## To start dev server
npm run dev


# To Query the DB
## To Run Flask Sheel so you can query the DB
```
source venv/bin/activate && flask shell
```
## To Exit
Type exit() and press Enter
Type quit() and press Enter
Press Ctrl + D (on Unix/Mac) or Ctrl + Z (on Windows)

## Get all users
User.query.all()

## Get user by email
User.query.filter_by(email='example@email.com').first()

## Get user by ID
User.query.get(1)  # Replace 1 with the user ID

## Count total users
User.query.count()

## Get verified users
User.query.filter_by(is_verified=True).all()

## Delete a user
user = User.query.get(1)  # Get user with ID 1
db.session.delete(user)
db.session.commit()

## Update a user
user = User.query.get(1)
user.email = 'newemail@example.com'
db.session.commit()