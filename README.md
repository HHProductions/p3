# # Global Emission (2000-2020)

 As global warming becomes worse, by analysing this dataset we tried to attempt make visualization about each countries contribution in global warming. 

* Data Source

1) https://www.kaggle.com/datasets/justin2028/total-emissions-per-country-2000-2020

 

* Dependancies:
1) Database : SQLite
2) Python 3.9 for Flask (API) 
3) JavaScript library : D3, plotly.js, chart.js, Leaflet.js


* Instructions: 

1) SQLite Database creation
  
  Used database_creation.ipynb to create database

2) Route to Interactive Dashboard

  Execute app_flask.py from the root of the repository

     ```sh 
    python3 app_flask.py
    ```

* API :

    http://127.0.0.1:5000/api/v1.0/emissions
    http://127.0.0.1:5000/api/polygons
    http://127.0.0.1:5000/api/countries

   