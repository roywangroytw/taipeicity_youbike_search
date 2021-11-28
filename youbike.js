$(document).ready(function (){

  const searchbtn = document.querySelector("#searchbtn");
  const search_input_disc = document.querySelector("#search_input_disc");
  const search_input_txt = document.querySelector("#search_input_txt");
  const result_container = document.querySelector(".row")

  searchbtn.addEventListener('click', (term) => {
    
    const inputValue_disc = search_input_disc.value.trim();
    const inputValue_txt = search_input_txt.value.trim();

    // 如果input有valide 值，才會call api
    if (inputValue_disc !== "" && inputValue_txt !== "") {

      $.ajax({
        url: 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json',
        dataType: 'json',
        success: function(data) {

          data.forEach((item) => {
            const regex_1 = `${inputValue_txt}`;
            const regex_2 = `${inputValue_disc}`;
            const adr = item.ar;
            const disc = item.sarea;

            if ( disc.match(regex_2) && adr.match(regex_1)) {

              const {sna, tot, sbi, sarea} = item;
              // sna : spot name
              // tot: total spots
              // sbi: free bikes to use
              // sarea: district

              const result_item = document.createElement("div");
              result_item.className = "col-12 col-md-3";

              const result_item_info = document.createElement("div");
              const result_item_info_name = document.createElement("h2");
              const result_item_info_district = document.createElement("p");
              const result_item_info_address = document.createElement("p");

              const result_item_data = document.createElement("div");
              const result_item_data_total = document.createElement("p");
              const result_item_data_ava = document.createElement("p");
              const result_item_data_all = document.createElement("p");
              const result_item_data_free = document.createElement("p");

              result_item_info_name.innerText = sna.replace("YouBike2.0_", "");
              result_item_info_district.innerText = sarea;
              result_item_info_address.innerText = adr;
              result_item_data_total.innerText = 'Total';
              result_item_data_ava.innerText = 'Available';
              result_item_data_all.innerText = tot;
              result_item_data_free.innerText = sbi;

              result_container.appendChild(result_item);
              result_item.append(result_item_info, result_item_data);
              result_item_info.append(result_item_info_name, result_item_info_district, result_item_info_address);
              result_item_data.append(result_item_data_total, result_item_data_ava, result_item_data_all, result_item_data_free);




              

            }

          })

          // Q: how to get the location of browser?
          // Q: how to make html ready and just simply use JS to duplicate and fill in the data?
    
        }
      
    });

    }

  })


})