(function(){

  let input = document.querySelector('input');
  let results = document.querySelector('#results');
  let searchBtn = document.querySelector('#search');
  let sortBtn = document.querySelector('.sort');
  let loading = document.querySelector('.loading');
  let html = ``;

  function displayResults(data){

      //Remove Loading screen after 800ms
      setTimeout(function(){
        loading.style.display= 'none'
      }, 800);

      //Clear previous results
      results.innerHTML = ' ';
      data.map(name=>{
        html = `
        <div class="row">
          <div class="column name">${name.title}</div>
            <div class="column sides">${name.snippet}</div>
        </div>`;

        //Add content to results div
        results.innerHTML += html;
      })
  }

  searchBtn.addEventListener('click', () =>{
        if(input.value !== ''){
          results.innerHTML = '';
          searchWiki(input.value);
        }
  })

  //clear out input when focused
  input.addEventListener('focus', ()=>{
      if(input.value !==''){
        input.value = '';
      }
  })

  sortBtn.addEventListener('click', ()=>{
      if(sortBtn.classList.contains('asc')){
        sortBtn.classList.remove('asc');
        sortBtn.classList.add('desc');
        sortBtn.innerHTML = '&#x2B06';

        //sort by descending title
        let desc = this.data.sort((a,b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0));
        displayResults(desc);

      }else if(sortBtn.classList.contains('desc')){
        sortBtn.classList.remove('desc');
        sortBtn.classList.add('asc');
        sortBtn.innerHTML = '&#x2B07';

        //sort by ascending title
        let asc = this.data.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
        displayResults(asc);
      }
  })

  function searchWiki(val){

    //lets update the Search result
    let heading = document.querySelector('.heading')
    heading.textContent = val;

    //set origin=* for anonymous requests
    let searchResult = `https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&list=search&srsearch=${val}&utf8=&format=json&origin=*`
    fetch(searchResult)
        .then((response)=>{
          return response.json();
        })
        .then((data) =>{
          //if no results display message
          if(data.query.search.length === 0){
            html = `
            <div class="row">
              <div class="column">No results found</div>
            </div>`;

            //reset data 
            this.data = 0;
            results.innerHTML += html;

          }else{
            //display Loading screen
            loading.style.display = 'block';

            //Display the result
            //make this.data available for sorting purposes
            this.data = data.query.search;

            //Display fetch results
            displayResults(this.data);
          }
        })
        .catch((error) =>{
          reject(error);
        })
  }

  // Lets Default with a search term shall we....
  searchWiki('Albert Einstein');

})()
