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
      
    //  resource html
    const markup = `
    <div class="card" style="width: 18rem;">
      <img src="${resourceData.thumbnail_photo_url}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">"${resourceData.title}"</h5>
        <p class="card-text">"${resourceData.description}"</p>
        <a href="${resourceData.url}" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    `;
    return markup;
  };

  const loadResources = () => {
    //  load existing tweets
    $.ajax('/api/resources', { method: 'GET'})
    .then(function (data) {
      
      renderResources(data.resources);
      // console.log(data)
    });

  };

  // //  load old tweets
  loadResources();
});


