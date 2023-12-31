import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import propTypes from "prop-types";
export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "science",
  };

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=a05277b90beb4cfebfa210dd9e640375&page=${this.state.page} &pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    // let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=a05277b90beb4cfebfa210dd9e640375&page=1 &pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading: true
    // });
    // let data= await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })
    this.updateNews();
  }

  handlePreviousClick = async () => {
    //   let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=a05277b90beb4cfebfa210dd9e640375&page=${this.state.page - 1} & pageSize=${this.props.pageSize}`;
    //   this.setState({
    //     loading: true
    //   });
    //   let data= await fetch(url);
    //   let parsedData = await data.json()
    //   console.log(parsedData);
    //   this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();
  };

  handleNextClick = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    )
      //
      // let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=a05277b90beb4cfebfa210dd9e640375&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      // this.setState({
      //   loading: true
      // });
      // let data= await fetch(url)
      // let parsedData = await data.json()
      this.setState({
        page: this.state.page + 1,
      });
    this.updateNews();
    //}
  };

  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center" style={{marginTop:'90px'}}>News App- Top Headlines</h1>
          {this.state.loading && <Spinner />}
          <div className="row">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      descrption={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={Date(element.publishedAt)}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePreviousClick}
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default News;
