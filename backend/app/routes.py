from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from flask_mail import Message
from . import db, mail
from .models import User
import secrets
import re

auth_bp = Blueprint('auth', __name__)

def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

@auth_bp.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No data provided'}), 400

        email = data.get('email')
        password = data.get('password')

        print(f"Received signup request for email: {email}")  # Debug log

        if not email or not password:
            return jsonify({'message': 'Email and password are required'}), 400

        if not is_valid_email(email):
            return jsonify({'message': 'Invalid email format'}), 400

        if len(password) < 8:
            return jsonify({'message': 'Password must be at least 8 characters long'}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({'message': 'Email already registered'}), 409

        user = User(email=email)
        user.set_password(password)
        user.is_verified = True  # Set user as verified by default

        try:
            db.session.add(user)
            db.session.commit()

            # Create access token for immediate signin
            access_token = create_access_token(identity=user.id)

            return jsonify({
                'message': 'User created successfully',
                'token': access_token
            }), 201

        except Exception as e:
            print(f"Error during user creation: {str(e)}")  # Debug log
            db.session.rollback()
            return jsonify({'message': 'Error creating user'}), 500

    except Exception as e:
        print(f"Unexpected error in signup route: {str(e)}")  # Debug log
        return jsonify({'message': 'Internal server error'}), 500

@auth_bp.route('/verify', methods=['GET'])
def verify():
    token = request.args.get('token')
    if not token:
        return jsonify({'message': 'Verification token is required'}), 400

    user = User.query.filter_by(verification_token=token).first()
    if not user:
        return jsonify({'message': 'Invalid verification token'}), 400

    user.is_verified = True
    user.verification_token = None
    db.session.commit()

    return jsonify({'message': 'Email verified successfully'}), 200

@auth_bp.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'message': 'Invalid email or password'}), 401

    if not user.is_verified:
        return jsonify({'message': 'Please verify your email before signing in'}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({
        'message': 'Signed in successfully',
        'token': access_token
    }), 200

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'message': 'Email is required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'If an account exists with this email, you will receive a password reset link'}), 200

    user.reset_token = secrets.token_urlsafe(32)
    db.session.commit()

    reset_link = f"http://localhost:5173/reset-password?token={user.reset_token}"
    msg = Message(
        'Reset your Noise2Ink password',
        recipients=[email],
        html=f'''
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password:</p>
        <p><a href="{reset_link}">{reset_link}</a></p>
        <p>If you did not request this reset, please ignore this email.</p>
        '''
    )
    mail.send(msg)

    return jsonify({'message': 'If an account exists with this email, you will receive a password reset link'}), 200

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    token = data.get('token')
    new_password = data.get('password')

    if not token or not new_password:
        return jsonify({'message': 'Token and new password are required'}), 400

    if len(new_password) < 8:
        return jsonify({'message': 'Password must be at least 8 characters long'}), 400

    user = User.query.filter_by(reset_token=token).first()
    if not user:
        return jsonify({'message': 'Invalid or expired reset token'}), 400

    user.set_password(new_password)
    user.reset_token = None
    db.session.commit()

    return jsonify({'message': 'Password reset successfully'}), 200
