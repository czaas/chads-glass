'use strict';

if (module.hot) {
  module.hot.accept();
}

import '../styles/index.scss';
import { h, app } from 'hyperapp';

const SingleImage = ({ toggleModal, image }) => (
  <div class="images__single">
    <img src={ image.images.low_resolution.url } onclick={ () => toggleModal(image) } />
    <p><strong>{ image.likes.count } likes</strong><br />{ image.caption.text.replace('#', '#\n') }</p>
  </div>
);

const Modal = ({ showModal, toggleModal, updateImage, currentImage, nextImage, prevImage }) => {
  if (currentImage) {

    let currentImageHtml = <img src={currentImage.images.standard_resolution.url} width={currentImage.images.standard_resolution.width} height={currentImage.images.standard_resolution.height} />;

    let media;

    if (currentImage.alt_media_url) {
      media = <video src={currentImage.alt_media_url} controls="true" autoplay="true" loop="true" muted="true" />;
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
    profile: {},
    showModal: false,
    currentImage: undefined,
    nextImage: undefined,
    prevImage: undefined,
  },
  view: (state, actions) => (
  <main>
      <div class="top">
        <h1>Chads Glass</h1>
        <div class="top__image">
          <a href={`https://www.instagram.com/${ state.profile.username }`} target="_blank"><img src={ state.profile.image } alt={state.profile.name} /></a>
        </div>
      </div>

      <div class="content-section">
        <p>Yo! I'm a lamp worker with a private studio. I make pendants, trinkets, and many more unique pieces with glass.</p> 

        <p><a href="mailto:temp@email.com">Hit me up</a> if you're interested in something you see or you want to commision a piece.</p>
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
  </main>
  ),
  actions: {
    addItems: (state, actions, items) => state.items = items,
    updateProfile: (state, actions, profile) => {
      state.profile = profile;

      return state;
    },
    updateImage: (state, actions, newImage) => {
      if (newImage && newImage.id) {
        for (let i = 0; i < state.items.length; i++) {
          if (state.items[i].id === newImage.id) {
            state.nextImage = state.items[i + 1];
            state.prevImage = state.items[i - 1];
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
  },
  events: {
    loaded: (state, actions) => {
      let instaData = window.instaData;

      console.log(instaData);

      let profile = {
        name: instaData.items[0].user.full_name,
        image: instaData.items[0].user.profile_picture,
        username: instaData.items[0].user.username,
      };

      actions.addItems({ items: instaData.items });
      actions.updateProfile(profile);
    }
  }
});