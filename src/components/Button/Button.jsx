import css from 'components/Button/Button.module.css';
export const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <div className={css.wrapper}>
      <button className={css.Button} onClick={onLoadMore}>
        Load More
      </button>
    </div>
  );
};
