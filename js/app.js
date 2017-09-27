let my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четверг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертил чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

window.ee = new EventEmitter();

let Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function () {
        return {
            visible: false
        }
    },
    readmoreClick: function (e) {
        e.preventDefault();
        this.setState({visible: true});
    },
    render: function () {
        let author = this.props.data.author;
        let text = this.props.data.text;
        let bigText = this.props.data.bigText;
        let visible = this.state.visible;
        return (
            <div className="article">
                <p className="news__author">{author}:</p>
                <p className="news__text">{text}</p>
                <a href="#"
                   onClick={this.readmoreClick}
                   className={'news__readmore ' + (visible ? 'none' : '')}>
                    Подробнее
                </a>
                <p className={'news__big-text ' + (visible ? '' : 'none')}>{bigText}</p>

            </div>
        );
    }
});

let Add = React.createClass({
    getInitialState: function () { //устанавливаем начальное состояние (state)
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true
        };
    },
    componentDidMount: function () {
        ReactDOM.findDOMNode(this.refs.author).focus();
    },
    onBtnClickHandler: function (e) {
        e.preventDefault();

        let textEl = ReactDOM.findDOMNode(this.refs.text);

        let author = ReactDOM.findDOMNode(this.refs.author).value;
        let text = ReactDOM.findDOMNode(this.refs.text).value;

        let item = [{
            author: author,
            text: text,
            bigText: '...'
        }];
        window.ee.emit('News.add', item);

        textEl.value = '';
        this.setState({textIsEmpty: true});
    },
    onCheckRuleClick: function () {
        this.setState({agreeNotChecked: !this.state.agreeNotChecked}); //устанавливаем значение в state
    },
    onFieldChange: function(fieldName, e) {
        this.setState({[fieldName]: !(e.target.value.trim().length > 0)});
    },
    render: function () {
        return (
            <form className='add cf'>
                <input
                    type='text'
                    className='add__author'
                    defaultValue=''
                    placeholder='Ваше имя'
                    ref='author'
                    onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
                />
                <textarea
                    className='add__text'
                    defaultValue=''
                    placeholder='Текст новости'
                    ref='text'
                    onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
                />
                <label className='add__checkrule'>
                    <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
                </label>
                {/* берем значение для disabled атрибута из state */}
                <button
                    className='add__btn'
                    onClick={this.onBtnClickHandler}
                    ref='alert_button'
                    disabled={this.state.agreeNotChecked || this.state.authorIsEmpty || this.state.textIsEmpty}
                >
                    Добавить новость
                </button>
            </form>
        );
    }
});


let News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    getInitialState: function () {
        return {
            counter: 0
        }
    },
    render: function () {
        let data = this.props.data;
        let newsTemplate;
        if (data.length > 0) {
            newsTemplate = data.map(function (item, index) {
                return (
                    <div key={index}>
                        <Article data={item}/>
                    </div>
                )
            })
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }

        return (
            <div className="news">
                {newsTemplate}
                <strong className={'news__count' + (data.length > 0 ? '' : 'none')}>Всего
                    новостей: {data.length}</strong>
            </div>
        );
    }
});


let App = React.createClass({
    getInitialState: function() {
        return {
            news: my_news
        };
    },
    componentDidMount: function() {
        let self = this;
        window.ee.addListener('News.add', function(item) {
            let nextNews = item.concat(self.state.news);
            self.setState({news: nextNews});
        });
    },
    componentWillUnmount: function() {
        window.ee.removeListener('News.add');

    },
    render: function () {
        return (
            <div className="app">
                <Add />
                <h3>Новости</h3>
                <News data={this.state.news} /> {/*добавили свойство data */}
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
