import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import { Card, Icon, Modal, Button } from 'antd';
import Nav from './Nav'
import { useParams, Link } from 'react-router-dom';
import {connect} from 'react-redux';


const { Meta } = Card;

function ScreenArticlesBySource(props) {

  const [articleList, setArticleList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});

  let { id } = useParams();
  console.log({ id })

  useEffect(() => {
    async function loadArticles() {
      var rawResponse = await fetch(`https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=${process.env.API_KEY}`);
      var response = await rawResponse.json();
      setArticleList(response.articles);
    }
    loadArticles();
  }, []);

  // modals
  const showModal = (title, content, date, url, author) => {
    setIsModalVisible(true);
    setModalContent({title, content, date, url, author})
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  console.log(articleList)
  let articles = articleList.map(art => {
    let publishedDate = new Date(art.publishedAt);
    let fDate = publishedDate.toLocaleString('fr-FR', 'short');

    let writtenBy = ''
    if (modalContent.author !== null) {
      writtenBy = <p>Ecrit par {modalContent.author}</p>
    }
    return <Card
      style={{
        width: 300,
        margin: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
      cover={
        <img
          alt="example"
          src={art.urlToImage}
        />
      }
      actions={[
        <Button type="primary" onClick={() => showModal(art.title, art.content, fDate, art.url, art.author)}>
          <Icon type="read" key="ellipsis2" />
        </Button>,
        <Icon type="like" key="ellipsis" onClick={ ()=>props.addToWishlist(art) }/>
      ]}
    >

      <Meta
        title={art.title}
        description={art.description}
      />
      <>

        <Modal title={modalContent.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>{modalContent.content}</p>
          {writtenBy}
          <p>Publié à {modalContent.date}</p>
          <a href={modalContent.url} target='_blank'>Voir sur le site</a>
        </Modal>
      </>
    </Card>

  })

  return (
    <div>

      <Nav />

      <div className="Banner" />

      <div className="Card">

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

          {articles}

        </div>




      </div>



    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishlist: function(article) {
        dispatch( {type: 'addArticle', newArticle: article} )
    }
  }
 }
 
 export default connect(
    null,
    mapDispatchToProps
 )(ScreenArticlesBySource);

//  export default ScreenArticlesBySource