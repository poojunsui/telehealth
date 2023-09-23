from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/getMedication'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)


class MedicalCondition(db.Model):
    __tablename__ = 'medicalConditions'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    medications = db.relationship('Medication', backref='medical_condition', lazy=True)

class Medication(db.Model):
    __tablename__ = 'medications'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    medicalConditionID = db.Column(db.Integer, db.ForeignKey('medicalConditions.id'), nullable=False)

    def json(self):
        return {"name": self.name}

@app.route("/getMedication/<string:medical_condition>")
def get_medications_by_condition(medical_condition):
    condition = MedicalCondition.query.filter_by(name=medical_condition).first()

    if condition:
        medications = [medication.json() for medication in condition.medications]
        return jsonify({
            "code": 200,
            "data": medications
        })

    return jsonify({
        "code": 404,
        "message": "Medical condition not found."
    }), 404

if __name__ == '__main__':
    app.run(port=5000, debug=True)
