$(document).ready(function (){

  const searchbtn = document.querySelector("#searchbtn");
  const search_input = document.querySelector("#search_input");

  searchbtn.addEventListener('click', (term) => {
    
    const inputValue = search_input.value.trim();

    // 如果input有valide 值，才會call api
    if (inputValue !== "") {

      $.ajax({
        url: 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json',
        dataType: 'json',
        success: function(data) {

          let count = 0

          data.forEach((item) => {
            const regex = `${inputValue}`
            const adr = item.ar
            if (adr.match(regex)) {
              count += 1;
              console.log(count);
            }

          })
    
          // let count = 0;
    
          // data.forEach((item) => {
          //   if (item.sarea === "中山區") {
          //       count += 1;
          //     }
          //   })
    
          // console.log(count);
    
        }
      
    });

    }

  })


})