class DragAndDrop {
    selectors = {
        root: '.shop__product',
        cart: '.shop__cart',
        buy: '.shop__button',
    }
    
    stateClasses = {
        isDragging: 'is-dragging',
        isButtonShow: 'shop__button--show',
        inCart: 'shop__product--inCart'
    }
    
    initialState = {
        offsetX: null,
        offsetY: null,
        isDragging: false,
        currentDraggingElement: null,
        cartMinCount: 3,
    }

    constructor() {
        this.state = { ...this.initialState }
        this.bindEvents()
    }

    resetState() {
        this.state = { ...this.initialState }
    }

    onPointerDown(event) {
        const { target, x, y } = event
        const isDraggable = target.matches(this.selectors.root)

        if (!isDraggable) {
            return
        }

        target.classList.add(this.stateClasses.isDragging)

        const { left, top } = target.getBoundingClientRect()

        this.state = {
            offsetX: x - left,
            offsetY: y - top,
            isDragging: true,
            currentDraggingElement: target,
        }
    }

    onPointerMove(event) {
        if (!this.state.isDragging) {
            return
        }

        const x = event.pageX - this.state.offsetX
        const y = event.pageY - this.state.offsetY

        this.state.currentDraggingElement.style.left = `${x}px`
        this.state.currentDraggingElement.style.top = `${y}px`
    }

    onPointerUp() {
        if (!this.state.isDragging) {
            return
        }

        const draggedElement = this.state.currentDraggingElement;
        const cartElement = document.querySelector(this.selectors.cart);
        
        if (this.checkProductInCart(draggedElement, cartElement)) {
            draggedElement.classList.add(this.stateClasses.inCart);
        } else {
            draggedElement.classList.remove(this.stateClasses.inCart);
        }

        draggedElement.classList.remove(this.stateClasses.isDragging)
        this.resetState()

        this.toggleButtonVisibility(this.initialState.cartMinCount);
    }

    // Функция для проверки, находится ли товары внутри корзины
    checkProductInCart(element, container) {
        const rect = element.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        return rect.left >= containerRect.left &&
            rect.right <= containerRect.right &&
            rect.top >= containerRect.top &&
            rect.bottom <= containerRect.bottom
    }

    // Функция переключает видимость кнопки покупки в зависимости от кол-ва товаров в корзине
    toggleButtonVisibility(count) {
        const inCart = document.querySelectorAll(`.${this.stateClasses.inCart}`)
        const buyButton = document.querySelector(this.selectors.buy)

        buyButton.classList.toggle(this.stateClasses.isButtonShow, (inCart.length >= count))
    }

    bindEvents() {
        document.addEventListener('pointerdown', (event) => this.onPointerDown(event))
        document.addEventListener('pointermove', (event) => this.onPointerMove(event))
        document.addEventListener('pointerup', () => this.onPointerUp())
    }
}

new DragAndDrop()