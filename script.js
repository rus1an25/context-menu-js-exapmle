window.addEventListener('DOMContentLoaded', () => {
    //Элементы
    const contextMenu = document.querySelector('.context-menu');
    const body = document.querySelector('body');
    const liChapter = document.querySelectorAll('.li-chapter');

    console.log();

    //Глобальные переменные
    let widthElement = parseInt(window.getComputedStyle(contextMenu).width);

    const posXcontextMenu = (left, height) => {
        contextMenu.style.height = height + 'px';
        contextMenu.style.left = left + 'px';
    }
    const posYcontextMenu = (top, height) => {
        contextMenu.style.height = height + 'px';
        contextMenu.style.top = top + 'px';
    }

    const callContextMenu = (event) => {
        contextMenu.style.display = 'block';
        contextMenu.style.overflow = 'hidden';

        const menuListGroups = document.querySelector('.menu-list-groups');
        let heightBody = parseInt(window.getComputedStyle(body).height)-4;
        let heightMenuCont = parseInt(window.getComputedStyle(menuListGroups).height);

        let changedHeight = heightMenuCont;
        if (heightBody < changedHeight) {
            changedHeight = heightBody;
            posYcontextMenu(0, changedHeight);
            contextMenu.style.overflowY = 'scroll';
        }
        let percentHeightBody = (event.offsetY / heightBody) * 100;

        //"leftLine" показывает текущую позицию клика по Х, относительно левого края окна браузера
        let leftLine = event.offsetX;

        //"bottomLine" показывает, высоту между верхней границей клика и нижней границей окна браузера
        let bottomLine = (heightBody - event.offsetY);

        if (leftLine <= widthElement) posXcontextMenu(0, changedHeight);
        if (leftLine > widthElement) posXcontextMenu(leftLine - widthElement, changedHeight);
        if (percentHeightBody <= 50 && bottomLine >= changedHeight) posYcontextMenu(event.offsetY, changedHeight); 
        if (percentHeightBody > 50 && event.offsetY >= changedHeight) posYcontextMenu(event.offsetY-changedHeight, changedHeight);

        console.log(heightMenuCont);
    }

    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        callContextMenu(e);
        return false;
        }, false);

  body.addEventListener('click', () => {
    contextMenu.style.display = 'none';
  });

  liChapter.forEach(li => li.addEventListener('mouseover', (e) => {
      let target = e.target;

      if (target.children.length > 1 && target.children[1].classList.contains('ulli')) {
        target.children[1].style.display = 'block';
        console.log(target.children);
      }
      
  }));

  liChapter.forEach(li => li.addEventListener('mouseout', (e) => {
    let target = e.target;

    if (target.children.length > 1 && target.children[1].classList.contains('ulli')) {
      target.children[1].style.display = 'none';
      console.log(target.children);
    }
    
}));

});