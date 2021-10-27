/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

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
      <a class="btn-upvote" data-id="${resourceData.id}"><i class="fas fa-arrow-up"></i></a>
      <a class="btn-downvote" data-id="${resourceData.id}"><i class="fas fa-arrow-down"></i></a>
      <button class="btn btn-like" type="submit"><i class="far fa-heart"></i></button>
        </footer>
    </div>
    `;
    return markup;
  };

  const loadResources = () => {
    //  load existing resources
    $.ajax('/api/resources', { method: 'GET' })
      .then(function (data) {
        renderResources(data.resources);
      });

  };


  loadResources();

// Search functionality
  function search(params) {
    $.ajax(`/api/resources/${params}`, { method: 'GET' })
      .then(function (data) {
        renderResources(data.resources);
      });
  }

  $("#searchForm").on("submit", function (event) {
    event.preventDefault();
    const searchData = $(this).children("input").val();
    search(searchData);
  });

  //Load My pins page

  $("#mypins").on("click", function (event) {
    event.preventDefault();
    $.ajax(`/mypins/`, { method: 'GET' })
      .then(function (data) {
        renderResources(data.resources);
      });

  });

  // upvote button
    $('#resource-container').on("click", '.btn-upvote', function (event) {
    event.preventDefault();
    const id = $(this).data("id");
    console.log(id)
    $.ajax(`/api/resources/${id}/upvote`, { method: 'POST' })
       .then(function (data) {

       });

  })

  $('#resource-container').on("click", '.btn-downvote', function (event) {
    event.preventDefault();
    const id = $(this).data("id");
    console.log(id)
    $.ajax(`/api/resources/${id}/downvote`, { method: 'POST' })
       .then(function (data) {

       });

  })



});





