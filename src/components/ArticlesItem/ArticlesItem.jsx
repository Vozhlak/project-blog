import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import styles from './ArticlesItem.module.scss';
import Like from '../Like';
import TagList from '../TagList/TagList';
import useGetStateNetwork from '../../hooks/useGetStateNetwork';
import options from '../../utils/getOptionsToast';

const ArticlesItem = ({ data }) => {
  const { title, description, tagList, author, favoritesCount, slug, favorited, createdAt } = data;
  const { username, image } = author;
  const isOnline = useGetStateNetwork();

  const currentUsername = username || 'Not username';
  const date = createdAt ? format(new Date(createdAt), 'MMMM d, yyyy') : 'not date';
  const avatar = image || 'https://static.productionready.io/images/smiley-cyrus.jpg';

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles['wrapper-author']}>
          <div className={styles['wrapper-info']}>
            <span className={styles.nameAuthor}>{currentUsername}</span>
            <span className={styles.dateCreate}>{date}</span>
          </div>
          <img
            className={styles.avatar}
            src={avatar}
            alt='avatar'
            onError={(e) => {
              e.target.src = 'https://static.productionready.io/images/smiley-cyrus.jpg';
            }}
          />
        </div>
        <div className={styles['body-articles']}>
          <div className={styles['title-and-likes']}>
            <h2 className={styles.title}>
              <Link
                className={styles.title__link}
                to={isOnline ? `/articles/${slug}` : '#'}
                onClick={() => !isOnline && toast.error('Not network', options)}>
                {title}
              </Link>
            </h2>
            <span className={styles.like}>
              <Like
                favoritesCount={favoritesCount}
                isFavorite={favorited}
                slug={slug}
              />
            </span>
          </div>
          <TagList data={tagList} />
          <p className={styles.desc}>{description}</p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ArticlesItem;
