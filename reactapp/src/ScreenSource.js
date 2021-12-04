import React, { useState, useEffect } from 'react';
import './App.css';
import { List, Avatar } from 'antd';
import Nav from './Nav'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {
    async function loadNews() {
      var rawResponse = await fetch(`https://newsapi.org/v2/top-headlines/sources?country=${props.lang}&apiKey=${process.env.API_KEY}`);
      var response = await rawResponse.json();
      setSourceList(response.sources);
    }
    loadNews();
  }, [props.lang]);


  const sources = sourceList.map(source => {
    return { title: source.name, url: source.url, description: source.description, id: source.id, category: source.category }
  })

  return (
    <div>
      <Nav />

      <div className="Banner" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%' }}>
          <img height='50px' src="../images/france.png" className="langIcon" onClick={()=>props.chooseLanguage('fr')}/>
          <img height='50px' src="../images/united-states.png" className="langIcon" onClick={()=>props.chooseLanguage('us')}/>
          <img height='50px' src="../images/united-kingdom.png" className="langIcon" onClick={()=>props.chooseLanguage('gb')}/>
          <img height='50px' src="../images/germany.png" className="langIcon" onClick={()=>props.chooseLanguage('de')}/>
          <img height='50px' src="../images/spain.png" className="langIcon" onClick={()=>props.chooseLanguage('es')}/>
          <img height='50px' src="../images/china.png" className="langIcon" onClick={()=>props.chooseLanguage('cn')}/>
        </div>

        <img />
      </div>

      <div className="HomeThemes">

        <List
          itemLayout="horizontal"
          dataSource={sources}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`images/${item.category}.png`} />}
                title={<Link to={`screen-articles-by-source/${item.id}`}>{item.title}</Link>}
                description={item.description}
              />
            </List.Item>
          )}
        />


      </div>

    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    chooseLanguage: function(lang) {
        dispatch( {type: 'chooseLang', language: lang} )
    }
  }
 } 

 function mapStateToProps(state) {
  return { lang: state.language }
 }
 export default connect(mapStateToProps, mapDispatchToProps)(ScreenSource);
