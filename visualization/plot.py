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


def plotElements(file, title, yAxis):
    with open(file + ".json") as readfile:
        data = json.load(readfile)

    linear_regressor = LinearRegression()  # create object for the class
    fig = plt.gcf()

    # Select all with naive selection. 100k elements
    df = pd.DataFrame(data)
    df = df.astype(float)
    df['time'] = df['time'].map(lambda a: a / 1000)
    df['timePerClick'] = df['timePerClick'].map(
        lambda a: a)  # milliseconds
#     df['timePerClick'] = df['timePerClick'].map(
#         lambda a: a / 1000)  # seconds

    # df.plot.scatter(
    #     x='elements', y='time', marker='.')
    # print(df.describe())
    # X = df[['elements']]
    # Y = df[['time']]
    df.describe()
    # linear_regressor.fit(X, Y)  # perform linear regression
    # Y_pred = linear_regressor.predict(X)  # make predictions
    # fig.plot(X, Y_pred, color='red')
    # axs[0].set_ylim(0, 0.05)

    df.plot.scatter(
        x='elements', y='timePerClick', marker='.')

    X = df[['elements']]
    Y = df[['timePerClick']]

    linear_regressor.fit(X, Y)  # perform linear regression
    Y_pred = linear_regressor.predict(X)  # make predictions
    plt.plot(X, Y_pred, color='red')
    plt.ylim(0, yAxis)
    plt.ylabel("Time per click in milliseconds")
    plt.xlabel("Number of elements")
    # fig.suptitle(title)
    plt.savefig("../master-thesis/figures/" + file + '.pgf')


def plotClicks(file, title, yAxis):
    with open(file + ".json") as readfile:
        data = json.load(readfile)

    linear_regressor = LinearRegression()  # create object for the class
    fig = plt.gcf()

    # Select all with naive selection. 100k elements
    df = pd.DataFrame(data)
    df = df.astype(float)
    df['time'] = df['time'].map(lambda a: a / 1000)
    df['timePerClick'] = df['timePerClick'].map(
        lambda a: a)  # milliseconds
#     df['timePerClick'] = df['timePerClick'].map(
#         lambda a: a / 1000)  # seconds

    # df.plot.scatter(
    #     x='elements', y='time', marker='.')
    # print(df.describe())
    # X = df[['elements']]
    # Y = df[['time']]
    df.describe()
    # linear_regressor.fit(X, Y)  # perform linear regression
    # Y_pred = linear_regressor.predict(X)  # make predictions
    # fig.plot(X, Y_pred, color='red')
    # axs[0].set_ylim(0, 0.05)

    df.plot.scatter(
        x='clicks', y='timePerClick', marker='.')

    X = df[['clicks']]
    Y = df[['timePerClick']]

    linear_regressor.fit(X, Y)  # perform linear regression
    Y_pred = linear_regressor.predict(X)  # make predictions
    plt.plot(X, Y_pred, color='red')
    plt.ylim(0, yAxis)
    plt.ylabel("Time per click in milliseconds")
    plt.xlabel("Number of clicks")
    # fig.suptitle(title)
    plt.savefig("../master-thesis/figures/" + file + '.pgf')


plt.close('all')


plotElements("selectAll_naive",
             "Select all with 4 clicks naive", 1500)
plotElements("selectAll_triangle",
             "Select all with 4 clicks incremental", 1500)


plotElements("selectAllManyClicks_naive",
             "Select all with 400 clicks naive", 100)
plotElements("selectAllManyClicks_triangle",
             "Select all with 400 clicks incremental", 100)


plotElements("selectRandom_naive",
             "Select random with 500 clicks naive", 25)
plotElements("selectRandom_triangle",
             "Select random with 500 clicks incremental", 25)

plotClicks("selectLargePolygon_naive",
           "Select random with 500 clicks naive", 250)
plotClicks("selectLargePolygon_triangle",
           "Select random with random number of clicks incremental", 25)

# plt.show()
