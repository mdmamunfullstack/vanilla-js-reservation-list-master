document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("registrar");
  var input = form.querySelector("input");
  var ul = document.getElementById("invitedList");
  var main = document.querySelector(".main");
  var div = document.createElement("div");
  var filterLable = document.createElement("label");
  var fitlerInput = document.createElement("input");
  filterLable.textContent = "Hide those who haven't responded";
  fitlerInput.type = "checkbox";

  fitlerInput.addEventListener("change", (e) => {
    var isChecked = e.target.checked;
    var lis = ul.children;
    if (isChecked) {
      for (let index = 0; index < lis.length; index++) {
        const element = lis[index];

        if (element.className == "responded") {
          element.style.display = "";
        } else {
          element.style.display = "none";
        }
      }
    } else {
      for (let index = 0; index < lis.length; index++) {
        const element = lis[index];
        element.style.display = "";
      }
    }
  });

  main.insertBefore(div, ul);
  div.appendChild(filterLable);
  div.appendChild(fitlerInput);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(input.value);
    var value = input.value;
    input.value = "";
    var li = createLI(value);
    ul.appendChild(li);
  });

  function createLI(value) {
    function createElement(elementName, perperty, value) {
      var element = document.createElement(elementName);
      element[perperty] = value;
      return element;
    }

    function appendToLi(elementName, perperty, value) {
      var element = createElement(elementName, perperty, value);
      li.appendChild(element);

      return element;
    }
    var li = document.createElement("li");

    appendToLi("span", "textContent", value);
    appendToLi("label", "textContent", "Confirmed").appendChild(
      createElement("input", "type", "checkbox")
    );
    appendToLi("button", "textContent", "edit");
    appendToLi("button", "textContent", "remove");

    return li;
  }

  ul.addEventListener("change", (e) => {
    debugger;
    console.log(e);
    var checkbox = e.target;
    var checked = checkbox.checked;

    var listItem = checkbox.parentNode.parentNode;
    if (checked) {
      listItem.className = "responded";
    } else {
      listItem.className = "";
    }
  });

  ul.addEventListener("click", (e) => {
    var button = e.target;
    var ul = button.parentNode.parentNode;
    var li = button.parentNode;
    var btnAction = button.textContent;
    var btnActions = {
      remove: () => {
        ul.removeChild(li);
      },

      edit: () => {
        var span = li.firstElementChild;
        var input = document.createElement("input");
        input.type = "text";
        input.value = span.textContent;

        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = "save";
      },

      save: () => {
        var input = li.firstElementChild;
        var span = document.createElement("span");
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);

        button.textContent = "edit";
      },
    };

    if (button.tagName == "BUTTON") {
      btnActions[btnAction]();
    }
  });

  /*
        ul.addEventListener("click", (e) => {
      var button = e.target;
      var ul = button.parentNode.parentNode;
      var li = button.parentNode;

      
      if (button.tagName == "BUTTON") {
        if (button.textContent == "remove") {
          ul.removeChild(li);
        } else  if (button.textContent == "edit")  {

            var span = li.firstElementChild;
            var input = document.createElement("input")
            input.type ='text';
            input.value = span.textContent;

            li.insertBefore(input, span);
            li.removeChild(span);
            button.textContent ='save'

        }

        else  if (button.textContent == "save")  {
            debugger;

            var input = li.firstElementChild;
            var span = document.createElement("span");
            span.textContent = input.value;
            li.insertBefore(span,input);
            li.removeChild(input);

            button.textContent ='edit'

        }
      }
    });
    */
});
