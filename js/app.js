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
        return (
            <div className="news">
                К сожалению, новостей нет.
            </div>
        );
    }
});

let App = React.createClass({
    render: function() {
        return (
            <div className="app">
                Всем привет, я компонент App! Я умею отображать новости.
                <News />
                <Comments />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
