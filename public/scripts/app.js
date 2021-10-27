/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderResources = (resources) => {
    const container = $('#resource-container');

    container.empty();

    // loops through resources
    for (const resource of resources) {


      // calls createResourceElement for each resource
      const oldResource = createResourceElement(resource);


      // takes return value and appends it to the resource container
      container.prepend(oldResource);
    }

  };

  const createResourceElement = (resourceData) => {
    console.log(resourceData)
    //  resource html
    const markup = `
    <div class="card" style="width: 18rem;">
      <img src="${resourceData.thumbnail_photo_url}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">"${resourceData.title}"</h5>
        <p class="card-text">"${resourceData.description}"</p>
        <a href="${resourceData.url}" class="btn btn-primary">Go To Resource</a>
        <a href="/details/${resourceData.id}">Details</a>
      </div>
      <footer>
      <form class="d-flex" method="post" action="/api/reviews/${resourceData.id}">
      <button class="btn btn-like" id="upvote" type="submit">Upvote</button>
            <button class="btn btn-like" type="submit"><i class="far fa-heart"></i></button>
        </footer>
        </form>
    </div>
    `;
    return markup;
  };

  const loadResources = () => {
    //  load existing resources
    $.ajax('/api/resources', { method: 'GET'})
    .then(function (data) {
      renderResources(data.resources);
    });

  };



  // Load all resources
  loadResources();

  //Search

  function search(params) {
    $.ajax(`/api/resources/${params}`, { method: 'GET'})
    .then(function (data) {
      renderResources(data.resources);
    });
  }

  $("#searchForm").on("submit", function(event) {
    event.preventDefault();
    const searchData = $(this).children("input").val();
    search(searchData);
    });

  // Load My Pins

    $("#mypins").on("click", function(event) {
      event.preventDefault();
      $.ajax(`/mypins/`, { method: 'GET'})
    .then(function (data) {
      renderResources(data.resources);
    });

  });

  // ratings



  // $( '#resource-container' ).on('click', '#upvote', function () {
  //   $.ajax(`/api/reviews`, { method: 'GET'})
  //   .then(function (data) {
  //     console.log(data)
  //   });
  // });



  });





