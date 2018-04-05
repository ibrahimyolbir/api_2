$(function () {
    //Länka Form
    $("#search-form").submit(function (e) {
        $(".movie-search-section").html("");
        e.preventDefault();
        var selected = [];
            $.each($("input[name='search-option']:checked"), function(){            
                selected.push($(this).val());
            });
            if ($.inArray("Movie",selected)!=-1){

        var searchTerm = $("#search-input").val();
        getRequest(searchTerm);
            }
 });
    //Hämta Data
    function getRequest(input) {
        var url = `https://www.omdbapi.com/?`;
        var rules = {
            apiKey : `e4cbae2`,
            s : input,
            r : `json`
        };
    $.getJSON(url,  rules, function(data) {
        console.log(data);
        showResults(data.Search);
    });
    }    
    
    
    // Visa data
    function showResults(data) {
        $(".movie-search-section").html(`
        <p>MOVIE</p>
        <ul id="movie-search-results">`);

        $.each(data, function (i, value){ 
        $("#movie-search-results").append(
            `<li>
            <div class="item">
                <div class="item_images">
                    <img src="${value.Poster}" alt="">
                </div>
                <div class="item_description">
                    <h5>${value.Title}</h5>
                    <p>${value.Year}</p>
                </div>
                <div class="item_button">
                    <div class="row">
                         <div class="price_item col-xs-12 col-md-5">
                            <p>${value.Year}</p>
                        </div>
                    <div  col-sm-7">
                        <button class="add_item" id="${i}"   >Lägg i Varukorg</button>
                    </div>
                </div>
                </div>
            </div>
         </li>`
            
            );
        });
        $(".movie-search-section").append(`    </ul>
`);
    
    }

    $(".add_item").click(function(){
    console.log(".add_item")
        var id = $(this).attr("id");
        var productType = $(this).attr("productType");
    
        var product = "" ;
        if(productType == "klader"){
             product = klader[id];
        }else if(productType == "electronic")
        {
            product = electronic[id];
        }
        cart.push(product);
        displayCart();  
    });
    
function displayCart() {
    cartText = " " ;
    for(var i=0; i < cart.length; i++ ) {
    cartText += `
    <div>
        <table class="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th></th>
                    <th>Lager Status</th>
                    <th>Antal</th>
                    <th>Pris</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody class="item">
                  <tr>
                    <td >
                        <img class="item_images_cart" src="${cart[i].picture}" alt="">
                    </td>
                    <td class="item_description">
                        <h5>${cart[i].name}</h5>
                        <p>${cart[i].description}</p>
                    </td>
                    <td>
                      <div>
                      I lager
                      </div>
                    </td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">1
                             <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#"4</a></li>
                            </ul> 
                        </div>
                    </td>
                    <td>
                         <p>${cart[i].price}</p>
                    </td>
                    <td class="delete_item">
                    <span class="glyphicon glyphicon-trash  id="${i}"></span>
                   </td>
                  </tr>
                </tbody>
              </table>
</div>` }
    $(".cart_list").html(cartText);
    //
    $('.cart-length').text(cart.length);
}
$('.shopping_list').on('click', '.delete_item', function (e) {
    var id = $(this).attr("id");
    cart.splice(id, 1);
    displayCart();
    
});


});


