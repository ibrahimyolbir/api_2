$(function () {
    //Länka Form
    $("#search-form").submit(function (e) {
        $(".book-search-section").html("");
        e.preventDefault();
        var selected = [];
        $.each($("input[name='search-option']:checked"), function(){            
            selected.push($(this).val());
        });
        if ($.inArray("Book",selected)!=-1){
    var searchTerm = $("#search-input").val();
    getRequest(searchTerm);
        }
    
    });
    //Hämta Data
   
    
    function getRequest (input) {
        var url = 'https://www.googleapis.com/books/v1/volumes?';
        var rules = {
            apiKey : 'AIzaSyBEwF9vkQQ6vHEJay_Z7XmzxTdEVBnDiIs' ,
            q: input,
            maxResults: 40
        }
       
        $.getJSON(url, rules, function (data) {
            console.log(data);
            showResults(data.items);
        });
    } 

    
    // Visa data
    function showResults(data) {
        $(".book-search-section").html(`
        <p>BOOKS</p>
        <ul id="book-search-results">`);

        $.each(data, function (i, value) {
           
        $("#book-search-results").append(`
                <li> 
                    <a class="">
                    <img class="film-banner" src=${value.volumeInfo.imageLinks.smallThumbnail} alt="Det Finns Ingen Bild">
                    
                    </a>
                    <div class="right-box">
                        <span>${value.volumeInfo.title}</span>
                        <span>${value.Year}</span>
                        <span>${value.Type}</span>
                        <span>${value.imdbID}</span>
                    </div>
                </li>
        `);

        });
        $(".movie-search-section").append(`    </ul>
        `);
    }
});