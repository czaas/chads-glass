'use strict';

if (module.hot) {
  module.hot.accept();
}

import '../styles/index.scss';
import { h, app } from 'hyperapp';

const SingleImage = ({ toggleModal, image }) => (
  <div class="images__single">
    <img src={ image.images.low_resolution.url } onclick={ () => toggleModal(image.images.standard_resolution) } />
    <p><strong>{ image.likes.count } likes</strong><br />{ image.caption.text.replace('#', '#\n') }</p>
  </div>
);

app({
  state: {
    items: [],
    profile: {},
    showModal: false,
    currentImage: {
      url: undefined,
      width: undefined,
      height: undefined,
    }
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

      <div class="modal" data-show={ (state.showModal) ? 'true' : 'false' }>
        <div class="modal__bg" onclick={actions.toggleModal} />
        <div class="modal__image">
          <img src={state.currentImage.url} width={state.currentImage.width} height={state.currentImage.height} />
        </div>
      </div>
  </main>
  ),
  actions: {
    addItems: (state, actions, items) => state.items = items,
    updateProfile: (state, actions, profile) => {
      state.profile = profile;

      return state;
    },
    toggleModal: (state, actions, image) => { 
      
      state.showModal = !state.showModal; 
      state.currentImage = image;

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