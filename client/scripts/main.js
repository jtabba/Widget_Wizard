let grid = GridStack.init({
  acceptWidgets: true,
  itemClass: 'grid-stack-item',
  dragIn: '.newWidget',
    dragInOptions : {
      revert:'invalid',
      handle:'.grid-stack-item',
      appendTo:'body',
      helper: 'clone'
    },
    cellHeight: '150px',
    disableResize: true,
    float: true
});

let currentlyAddingWidget = false;

let widgets = []

grid.on('added', (e, items) => {
  if(!currentlyAddingWidget){
    console.log(items[0])
      currentlyAddingWidget = true;
      grid.removeWidget(items[0].el)
      switch(items[0].id){
        case "calculatorWidget": widgets.push(new CalculatorWidget(items[0]));
        document.querySelector('.sidebar-calculator-widget').classList.add('hide-sidebar-widget')
        break;
        case "clockWidget": widgets.push(new ClockWidget(items[0]));
        document.querySelector('.sidebar-clock-widget').classList.add('hide-sidebar-widget')
        break;
        case "photoWidget": widgets.push(new PhotoWidget(items[0]));
        document.querySelector('.sidebar-photo-widget').classList.add('hide-sidebar-widget')
        break;
        case "cryptoWidget": widgets.push(new CryptoWidget(items[0]));
        document.querySelector('.sidebar-crypto-widget').classList.add('hide-sidebar-widget')
        break;
        case "weatherWidget": widgets.push(new WeatherWidget(items[0]));
        document.querySelector('.sidebar-weather-widget').classList.add('hide-sidebar-widget')
        break;
        case "dictionaryWidget": widgets.push(new DictionaryWidget(items[0]));
        document.querySelector('.sidebar-dictionary-widget').classList.add('hide-sidebar-widget')
        break;
    }
    saveWidgetProfileData();
    currentlyAddingWidget = false;
  }
})

grid.on('dragstart', (e, item) => {
  sideBar.classList.add('nav-show-edit')
  showTrashCan();
})

grid.on('dragstop', (e, item) => {
  sideBar.classList.remove('nav-show-edit')
  if (mouseOverTrashCan){
    addSideBarWidgetBack(item);
    grid.removeWidget(item)
    saveWidgetProfileData();
  }
  hideTrashCan();
  mouseOverTrashCan = false
})

grid.on('change',(i, j) => {
  saveWidgetProfileData();
})

