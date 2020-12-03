const inputRange = $('#html-input-range');
let htmlInputRange = {
  idNotThere : '<p>Note: Missing input tag id name e.g html-input-range</p>',
  init () {
    if (inputRange.length > 0) {
      let inputRanges = $('#html-input-range');
      inputRanges.parent().addClass('html-inupt-range');
      // if too many input ranges there for now hiding this part.
      // inputRanges.each(function( index ) {
      //   let $this = $(this);
      // });
      let $this = inputRanges;
        // default input range starts at 0 and ends at 100
        $this.attr({
          min: 0,
          max: 100,
          value: 0,
          step: 1
        });
    } else {
      $('input[type=range]').parent().append(htmlInputRange.idNotThere);
    }
  },
  options (inputs) {
    htmlInputRange.init();
    let options = inputs;
    // custom tracker
    $('input[type=range]').parent().addClass('html-input-range-custom');
    $('input[type=range]').parent().append('<div class="hir-tracker-bg"></div><div class="hir-tracker-thumb"></div>');
    let min = 0;
    let max = 100;
    if (options.tooltip === true) {
      if (options.max) {
        max = options.max;
        $(inputRange).attr({
          max: options.max
        });
      }
      $('input[type=range]').parent().append('<div class="tooltip">'+ min +'</div>');
    }
    if (options.labels === true) {
      $(inputRange).parent().append('<ul class="hir-labels"></ul>');
      let setWidth;
      if (options.max) {
        setWidth = options.max/10;
      } else {
        setWidth = max/10; 
      }
      for (let i = 0; i < setWidth; i++) {
        $('.hir-labels').append('<li class="col-'+ setWidth +' "></li>');
      }
    }
  }
}

$(inputRange).on('input change', inputRange, function (e) {
  /*
  * splitting 100 by input range max value
  * for active tracker and tooltip position.
  */
  let inputMax = 100 / inputRange.attr('max');
  let trackerTooltipMove = (inputRange.val() * inputMax);
  $('.html-inupt-range .tooltip').css('left', trackerTooltipMove + '%');
  $('.html-input-range-custom .hir-tracker-thumb').css('width', trackerTooltipMove + '%');
  // updating tooltip value based on the range from to.
  $('.html-inupt-range .tooltip').text(inputRange.val());
  //CUSTOM
  $('.sell_recomendation__price-semibold span').text(inputRange.val()/2);
  $('.sell_recomendation__price-input').val(inputRange.val());
  //CUSTOM END
});




	



$(function() {



	htmlInputRange.options({
	    tooltip: true,
	    max: 10000

	  });

	//--------recomendations-------

	$('.recommendations__btn_all').click(function () {
		$('.recommendations__row').removeClass('d-none');
	});
	$('.recommendations__btn_draft').click(function () {
		$('.recommendations__row').addClass('d-none');
		$('.draft').removeClass('d-none');
		$('.recommendations__row_first').removeClass('d-none');
	});
	$('.recommendations__btn_moderate').click(function () {
		$('.recommendations__row').addClass('d-none');
		$('.moderate').removeClass('d-none');
		$('.recommendations__row_first').removeClass('d-none');
	});
	$('.recommendations__btn_decline').click(function () {
		$('.recommendations__row').addClass('d-none');
		$('.decline').removeClass('d-none');
		$('.recommendations__row_first').removeClass('d-none');
	});
	$('.recommendations__btn_selling').click(function () {
		$('.recommendations__row').addClass('d-none');
		$('.selling').removeClass('d-none');
		$('.recommendations__row_first').removeClass('d-none');
	});
	$('.recommendations__btn_stopped').click(function () {
		$('.recommendations__row').addClass('d-none');
		$('.stopped').removeClass('d-none');
		$('.recommendations__row_first').removeClass('d-none');
	});
	$('.recommendations__btn_sold').click(function () {
		$('.recommendations__row').addClass('d-none');
		$('.sold').removeClass('d-none');
		$('.recommendations__row_first').removeClass('d-none');
	});

	//-----select------------

	var x, i, j, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

//----------select custom code------

$('.select-items div').click(function () {
	var $this  = $(this);
		parent = $($this).closest('.custom-select');
		complete = $(parent).find('.custom-select__complete');
		$(parent).addClass('darkFont');
		$(complete).removeClass('d-none');
		
});

$('.sell_recomendation__input').blur(function () {
	var $this  = $(this);
		parent = $($this).closest('.sell_recomendation__input-space');
		complete = $(parent).find('.custom-select__complete');
		if ($this.val() !== '') {
			$(complete).removeClass('d-none');
		} else {
			$(complete).addClass('d-none');
		}
		
		
});

//---------file custom code-------------




});
