import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Posts = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await fetch('posts/posts.json'); // Caminho atualizado
      const data = await response.json();
      setPosts(data.posts);
      // Extrai tags únicas em português e inglês
      const uniqueTags = [
        ...new Set(data.posts.flatMap(post => [...post.tags_pt, ...post.tags_en]))
      ];
      setTags(uniqueTags);
    };

    loadPosts();
  }, []);

  const filteredPosts = selectedTag 
    ? posts.filter(post => 
        (i18n.language === 'pt' ? post.tags_pt : post.tags_en).includes(selectedTag)
      ) 
    : posts;

  return (
    <section className="section-container">
      <h2 className="text-4xl font-bold mb-6">{t('posts.title')}</h2>
      <p className="text-sm text-gray-500 mb-4">{t('posts.filterInstruction')}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {(i18n.language === 'pt' 
          ? tags.filter(tag => posts.some(post => post.tags_pt.includes(tag))) 
          : tags.filter(tag => posts.some(post => post.tags_en.includes(tag)))
        ).map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-1 rounded-full border-2 border-primary ${selectedTag === tag ? 'bg-primary text-white' : 'bg-white text-black'} transition-colors`}
          >
            {tag}
          </button>
        ))}
        <button onClick={() => setSelectedTag(null)} className="px-4 py-1 rounded-full border-2 border-primary bg-white text-black transition-colors">
          {t('posts.all')}
        </button>
      </div>
      <div>
        {filteredPosts.map(post => (
          <div key={post.id} className="mb-4 p-4 border rounded flex flex-col md:flex-row items-start">
            <div className="flex-shrink-0">
              <img src={post.image} alt="Post" className="w-32 h-auto mr-4" />
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-semibold">{i18n.language === 'pt' ? post.title_pt : post.title_en}</h3>
              <p>{i18n.language === 'pt' ? post.excerpt_pt : post.excerpt_en}</p>
              <div className="flex items-center mt-2">
                {post.available_pt && <img src="/public/br-flag.svg" alt="Português" className="w-4 h-4 mr-2" />}
                {post.available_en && <img src="/public/uk-flag.svg" alt="English" className="w-4 h-4 mr-2" />}
                {post.icon && <img src={post.icon} alt="Source" className="w-4 h-4 mr-2" />}
              </div>
              <a href={post.url} className="text-primary mt-2" target="_blank" rel="noopener noreferrer">{t('posts.readMore')}</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Posts;