import math
from sklearn.linear_model import LinearRegression
import json
import pandas as pd
import matplotlib
matplotlib.use("pgf")
matplotlib.rcParams.update({
    "pgf.texsystem": "pdflatex",
    'font.family': 'serif',
    'text.usetex': True,
    'pgf.rcfonts': False,
})
import matplotlib.pyplot as plt


def plotElements(file, yAxis):
    with open("../results/" + file + ".json") as readfile:
        data = json.load(readfile)

    fig = plt.gcf()

    df = pd.DataFrame(data)
    df = df.astype(float)

    df.plot.scatter(
        x='elements', y='timePerClick', marker='.')

    X = df[['elements']]
    Y = df[['timePerClick']]

    linear_regressor = LinearRegression()
    linear_regressor.fit(X, Y)  
    Y_pred = linear_regressor.predict(X)

    plt.plot(X, Y_pred, color='red')

    plt.ylim(0, yAxis)
    plt.ylabel("Time per click in milliseconds")
    plt.xlabel("Number of elements")

    plt.savefig("../../master-thesis/figures/" + file + '.pgf')


def plotClicks(file, yAxis):
    with open("../results/" + file + ".json") as readfile:
        data = json.load(readfile)

    fig = plt.gcf()

    df = pd.DataFrame(data)
    df = df.astype(float)

    df.plot.scatter(
        x='clicks', y='timePerClick', marker='.')

    X = df[['clicks']]
    Y = df[['timePerClick']]

    linear_regressor = LinearRegression()
    linear_regressor.fit(X, Y)  
    Y_pred = linear_regressor.predict(X)

    plt.plot(X, Y_pred, color='red')
    
    plt.ylim(0, yAxis)
    plt.ylabel("Time per click in milliseconds")
    plt.xlabel("Number of clicks")

    plt.savefig("../../master-thesis/figures/" + file + '.pgf')



plotElements("selectAll_nonIncremental", 500)
plotElements("selectAll_incremental", 500)


plotElements("selectAllManyClicks_nonIncremental", 70)
plotElements("selectAllManyClicks_incremental", 70)


plotElements("selectRandom_nonIncremental", 15)
plotElements("selectRandom_incremental", 15)

plotClicks("selectLargePolygon_nonIncremental", 250)
plotClicks("selectLargePolygon_incremental", 10)
