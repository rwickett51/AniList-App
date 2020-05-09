const defaultStyles = {
  block: {
    marginBottom: 10,
    flexWrap: "wrap",
    flexDirection: "row"
  },
  blockQuote: {
    borderLeftWidth: 5,
    borderLeftColor: "#aaaaaa",
    backgroundColor: "#cccccc",
    paddingLeft: 10
  },
  h1: {
    fontSize: 30,
    marginTop: 20,
    color: "black",
    marginBottom: 8
  },
  h2: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
    color: "black"
  },
  h3: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
    color: "black"
  },
  h4: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
    color: "black"
  },
  h5: {
    fontSize: 20,
    marginTop: 12,
    marginBottom: 6,
    color: "black"
  },
  h6: {
    fontSize: 20,
    marginTop: 12,
    marginBottom: 6,
    color: "black"
  },
  hr: {
    alignSelf: "stretch",
    height: 1,
    backgroundColor: "#333333",
    marginVertical: 8,
    color: "black"
  },
  code: {
    backgroundColor: "#333333",
    color: "orange"
  },
  text: {
    alignSelf: "flex-start",
    color: "black"
  },
  strong: {
    fontWeight: "bold",
    color: "black"
  },
  em: {
    fontStyle: "italic",
    color: "black"
  },
  del: {
    textDecorationLine: "line-through",
    color: "black"
  },
  u: {
    textDecorationLine: "underline",
    color: "black"
  },
  linkWrapper: {
    alignSelf: "flex-start"
  },
  link: {
    textDecorationLine: "underline",
    alignSelf: "flex-start",
    color: "#00EEEE"
  },
  list: {
    marginBottom: 20
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 5
  },
  listItemContent: {
    flexDirection: "row",
    flexShrink: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  listItemBullet: {
    width: 4,
    height: 4,
    backgroundColor: "black",
    borderRadius: 2,
    marginRight: 10
  },
  listItemNumber: {
    marginRight: 10
  },
  imageWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  image: {
    flex: 1,
    minWidth: 200,
    height: 200
  }
};

export default defaultStyles;
