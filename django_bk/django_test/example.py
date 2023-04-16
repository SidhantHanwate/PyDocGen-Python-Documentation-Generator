# Import necessary libraries
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

# Define a function to train and test a KNN classifier on the iris dataset
def knn_classifier():
    # Load iris dataset
    iris = datasets.load_iris()

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.3)

    # Create KNN classifier with k=3
    knn = KNeighborsClassifier(n_neighbors=3)

    # Fit the classifier to the training data
    knn.fit(X_train, y_train)

    # Predict the target values for the testing data
    y_pred = knn.predict(X_test)

    # Print the accuracy score of the classifier
    print("Accuracy:", knn.score(X_test, y_test))

# Call the function
knn_classifier()
