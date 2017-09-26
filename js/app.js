let my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четверг, четвертого числа...'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000'
    }
];

let Comments = React.createClass({
   render: function() {
       return (
           <div className="comments">
              Нет новостей - комментировать нечего.
           </div>
        );
   }
});

let News = React.createClass({
    render: function() {
        let data = this.props.data;
        let newsTemplate = data.map(function(item, index) {
            return (
                <div key={index}>
                    <p className="news__author">{item.author}:</p>
                    <p className="news__text">{item.text}</p>
                </div>
            )
        });

        console.log(newsTemplate);

        return (
            <div className="news">
                {newsTemplate}
            </div>
        );
    }
});

let App = React.createClass({
    render: function() {
        return (
            <div className="app">
                Всем привет, я компонент App! Я умею отображать новости.
                <News data={my_news}/>  {/*добавили свойство data */}
                <Comments />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
