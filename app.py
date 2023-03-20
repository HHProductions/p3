import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


# Database Setup
engine = create_engine("sqlite:///Resources/database.sqlite")


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
Emission = Base.classes.total_emission

# Flask Setup
app = Flask(__name__)

# Flask Routes

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"/api/v1.0/emissions<br/>"
    )
    
##############

@app.route("/api/v1.0/emissions")
def emission_list():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list stations"""
    # Query all stations
    results = session.query(Emission.Country, Emission.latitude, Emission.longitude, getattr(Emission, '2000'), \
                            getattr(Emission, '2001'), getattr(Emission, '2002'), getattr(Emission, '2003'), \
                                getattr(Emission, '2004'), getattr(Emission, '2005'), getattr(Emission, '2006'), \
                                    getattr(Emission, '2007'), getattr(Emission, '2008'), getattr(Emission, '2009'), \
                                        getattr(Emission, '2010'), getattr(Emission, '2011'), getattr(Emission, '2012'), \
                                            getattr(Emission, '2013'), getattr(Emission, '2014'), getattr(Emission, '2015'), \
                                                getattr(Emission, '2016'), getattr(Emission, '2017'), getattr(Emission, '2018'), \
                                                    getattr(Emission, '2019'), getattr(Emission, '2020')).all()

    session.close()

    # Create a dictionary from the row data and append to a list
    all_emissions = []
    for i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13, i14, i15, i16, i17, i18, i19, i20, i21, i22, i23, i24 in results:
        emissions_dict = {}
        emissions_dict["country"] = i1
        emissions_dict["latitude"] = i2
        emissions_dict["longitude"] = i3
        emissions_dict["2000"] = i4
        emissions_dict["2001"] = i5
        emissions_dict["2002"] = i6
        emissions_dict["2003"] = i7
        emissions_dict["2004"] = i8
        emissions_dict["2005"] = i9
        emissions_dict["2006"] = i10
        emissions_dict["2007"] = i11
        emissions_dict["2008"] = i12
        emissions_dict["2009"] = i13
        emissions_dict["2010"] = i14
        emissions_dict["2011"] = i15
        emissions_dict["2012"] = i16
        emissions_dict["2013"] = i17
        emissions_dict["2014"] = i18
        emissions_dict["2015"] = i19
        emissions_dict["2016"] = i20
        emissions_dict["2017"] = i21
        emissions_dict["2018"] = i22
        emissions_dict["2019"] = i23
        emissions_dict["2020"] = i24
        all_emissions.append(emissions_dict)

    return jsonify(all_emissions)
##############

if __name__ == '__main__':
    app.run(debug=True)
