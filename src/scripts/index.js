'use strict';

if (module.hot) {
  module.hot.accept();
}

let apiURL = '';
if (process.env.NODE_ENV === 'development') {
  apiURL = 'http://localhost:8000';
} else {
  apiURL = 'http://chads-glass.czaas.com';
}

import 'whatwg-fetch';
import '../styles/index.scss';
import { h, app } from 'hyperapp';

import {
  isScrolledIntoView,
  throttle,
} from './_util.js';

const SingleImage = ({ toggleModal, image }) => (
  <div class="images__single">
    <img src={ image.images.low_resolution.url } onclick={ () => toggleModal(image) } />
    <svg data-video={image.alt_media_url ? 'true' : 'false'} width="25" height="25" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1792 352v1088q0 42-39 59-13 5-25 5-27 0-45-19l-403-403v166q0 119-84.5 203.5t-203.5 84.5h-704q-119 0-203.5-84.5t-84.5-203.5v-704q0-119 84.5-203.5t203.5-84.5h704q119 0 203.5 84.5t84.5 203.5v165l403-402q18-19 45-19 12 0 25 5 39 17 39 59z"/></svg>
    <p>{ (image.caption && image.caption.text) ? image.caption.text : '' }</p>
  </div>
);

const Modal = ({ showModal, toggleModal, updateImage, currentImage, nextImage, prevImage }) => {
  if (currentImage) {

    let currentImageHtml = <img src={currentImage.images.standard_resolution.url} width={currentImage.images.standard_resolution.width} height={currentImage.images.standard_resolution.height} />;

    let media;

    if (currentImage.alt_media_url) {
      media = <video src={currentImage.alt_media_url} autoplay="true" controls="true" loop="true" muted="true" width={currentImage.images.standard_resolution.width} height={currentImage.images.standard_resolution.height} />;
    } else {
      media = currentImageHtml;
    }

    return (
      <div class="modal" data-show={ (showModal) ? 'true' : 'false' }>
        <div class="modal__bg" onclick={toggleModal} />
        <div class="modal__content">
          
          <div class="modal__content__image">
            {media}
          </div>
          
          <div onclick={() => updateImage(prevImage)} data-image={(prevImage) ? 'true' : 'false'} class="modal__content__angle modal__content__angle--left"><svg width="45" height="45" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z"/></svg></div>

          <div onclick={() => updateImage(nextImage)} data-image={(nextImage) ? 'true' : 'false'} class="modal__content__angle modal__content__angle--right"><svg width="45" height="45" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"/></svg></div>
        </div>
      </div>
    );
  }
};

app({
  state: {
    items: [],
    profile: {
      name: undefined,
      username: undefined,
      image: undefined,
    },
    showModal: false,
    currentImage: undefined,
    nextImage: undefined,
    prevImage: undefined,
    isLoading: true,
    moreAvailable: true,
  },
  view: (state, actions) => (
  <main class="app" data-loading={state.isLoading ? 'true' : 'false'}>
      <div class="top">
        <h1>Chad's Glass</h1>
        <div class="top__image">
          <a href={`https://www.instagram.com/${ state.profile.username }`} target="_blank"><img src={ state.profile.image } alt={state.profile.name} /></a>
        </div>
      </div>

      <div class="content-section">
        <p>Yo! I'm a lamp worker with a private studio. I make pendants, trinkets, and many more unique pieces with glass.</p> 

        <p><a href="mailto:chadahouser@gmail.com">Hit me up</a> if you're interested in something you see or you want to commision a piece.</p>
      </div>
    
      <div class="images">
        { state.items.map((image) => <SingleImage toggleModal={actions.toggleModal} image={image} />) }
      </div>

      <Modal 
        showModal={state.showModal} 
        currentImage={state.currentImage} 
        nextImage={state.nextImage}
        prevImage={state.prevImage}
        toggleModal={actions.toggleModal} 
        updateImage={actions.updateImage}
      />

      <div class="content-section content-section--more" data-more-available={ state.moreAvailable ? 'true' : 'false' } id="load-more">
        <svg width="120px" height="120px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect x="47.5" y="40" width="5" height="20" rx="3" ry="3" fill="#0000ff" transform="rotate(0 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-1s" repeatCount="indefinite"></animate></rect><rect x="47.5" y="40" width="5" height="20" rx="3" ry="3" fill="#0000ff" transform="rotate(36 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.9s" repeatCount="indefinite"></animate></rect><rect x="47.5" y="40" width="5" height="20" rx="3" ry="3" fill="#0000ff" transform="rotate(72 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.8s" repeatCount="indefinite"></animate></rect><rect x="47.5" y="40" width="5" height="20" rx="3" ry="3" fill="#0000ff" transform="rotate(108 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.7s" repeatCount="indefinite"></animate></rect><rect x="47.5" y="40" width="5" height="20" rx="3" ry="3" fill="#0000ff" transform="rotate(144 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.6s" repeatCount="indefinite"></animate></rect><rect x="47.5" y="40" width="5" height="20" rx="3" ry="3" fill="#0000ff" transform="rotate(180 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate></rect><rect x="47.5" y="40" width="5" height="20" rx="3" ry="3" fill="#0000ff" transform="rotate(216 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.4s" repeatCount="indefinite"></animate></rect><rect x="47.5" y="40" width="5" height="20" rx="3" ry="3" fill="#0000ff" transform="rotate(252 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.3s" repeatCount="indefinite"></animate></rect><rect x="47.5" y="40" width="5" height="20" rx="3" ry="3" fill="#0000ff" transform="rotate(288 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.2s" repeatCount="indefinite"></animate></rect><rect x="47.5" y="40" width="5" height="20" rx="3" ry="3" fill="#0000ff" transform="rotate(324 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.1s" repeatCount="indefinite"></animate></rect></svg>
      </div>
      <div class="content-section content-section--leave" data-more-available={ state.moreAvailable ? 'true' : 'false' }>
        <p>View my Instagram</p>

        <p><a href={`https://www.instagram.com/${ state.profile.username }`} target="_blank"><svg width="50" height="50" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm138 0q0 164-115 279t-279 115-279-115-115-279 115-279 279-115 279 115 115 279zm108-410q0 38-27 65t-65 27-65-27-27-65 27-65 65-27 65 27 27 65zm-502-220q-7 0-76.5-.5t-105.5 0-96.5 3-103 10-71.5 18.5q-50 20-88 58t-58 88q-11 29-18.5 71.5t-10 103-3 96.5 0 105.5.5 76.5-.5 76.5 0 105.5 3 96.5 10 103 18.5 71.5q20 50 58 88t88 58q29 11 71.5 18.5t103 10 96.5 3 105.5 0 76.5-.5 76.5.5 105.5 0 96.5-3 103-10 71.5-18.5q50-20 88-58t58-88q11-29 18.5-71.5t10-103 3-96.5 0-105.5-.5-76.5.5-76.5 0-105.5-3-96.5-10-103-18.5-71.5q-20-50-58-88t-88-58q-29-11-71.5-18.5t-103-10-96.5-3-105.5 0-76.5.5zm768 630q0 229-5 317-10 208-124 322t-322 124q-88 5-317 5t-317-5q-208-10-322-124t-124-322q-5-88-5-317t5-317q10-208 124-322t322-124q88-5 317-5t317 5q208 10 322 124t124 322q5 88 5 317z"/></svg></a></p>
      </div>
  </main>
  ),
  actions: {
    updateProfile: (state, actions, profile) => {
      state.profile = profile;
      return state;
    },
    updateImage: (state, actions, newImage, emit) => {
      if (newImage && newImage.id) {
        for (let i = 0; i < state.items.length; i++) {
          if (state.items[i].id === newImage.id) {
            state.nextImage = state.items[i + 1];
            state.prevImage = state.items[i - 1];

            if ((state.items.length - 5) === i && state.moreAvailable) {
              let lastItemId = state.items[state.items.length - 1].id;

              emit('getImages', lastItemId);
            }
          }
        }

        state.currentImage = newImage;

        return state;
      }
    },
    toggleModal: (state, actions, image) => { 
      actions.updateImage(image);

      state.showModal = !state.showModal; 

      return state; 
    },
    addItems: (state, actions, items) => {
      state.items = items;

      return state;
    },
    toggleMoreAvailable: (state, actions, bool) => {
      state.moreAvailable = bool;

      return state;
    },
    toggleLoading: (state, actions, bool) => {
      state.isLoading = bool || !state.isLoading;

      return state;
    },
  },
  events: {
    loaded: (state, actions, data, emit) => {
      emit('getImages');

      let loadMoreElem = document.getElementById('load-more');

      let efficientScroll = throttle(function() {
        emit('checkIfScrolledIntoView', loadMoreElem);
      }, 30);

      window.addEventListener('scroll', efficientScroll);
    },
    checkIfScrolledIntoView: (state, actions, loadMoreElem, emit) => {
      if (state.moreAvailable && !state.isLoading) {
        if (isScrolledIntoView(loadMoreElem)) {
          let lastItemId = state.items[state.items.length - 1].id;

          emit('getImages', lastItemId);
        }
      }
    },
    getImages: (state, actions, id) => {
      let lastId = '';

      if (id) {
        lastId = `?last_id=${ id }`;
      }
      actions.toggleLoading(true);
      
      fetch(`${ apiURL }/api.php${ lastId }`, {
        method: 'GET',
        mode: 'cors',
        headers: new Headers(),
        'Access-Control-Allow-Origin': '*',
      })
        .then((res) => res.json())
        .then((json) => {
          if (!state.profile.username) {
            let profile = {
              name: json.items[0].user.full_name,
              image: json.items[0].user.profile_picture,
              username: json.items[0].user.username,
            };

            actions.updateProfile(profile);
          }

          let mergedItems = state.items;

          for (let i = 0; i < json.items.length; i++) {
            mergedItems.push(json.items[i]);
          }

          actions.toggleLoading(false);
          
          actions.toggleMoreAvailable(json.more_available);
          actions.addItems(mergedItems);
        });
    },
  }
});