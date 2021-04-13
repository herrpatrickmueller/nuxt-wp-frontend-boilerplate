export default $axios => ({
  getCategories() {
    return $axios.get('categories?sort=name&hide_empty=true&per_page=100');
  },

  getPages() {
    return $axios.get('pages?per_page=100');
  },

  getPage(slug) {
    if (!slug) return false;
    return $axios.get(`pages?slug=${slug}`)
  },

  getFrontpage() {
    return $axios.get('/frontpage')
  },

  getPosts(limit = 5) {
    return $axios
      .get(`posts?per_page=${limit}`);
  },

  getPost(slug) {
    if (!slug) return false;
    return $axios.get(`posts?slug=${slug}`)
  },

  getMenus() {
    return $axios.get('menus');
  },

  getMeta() {
    return $axios.get('meta');
  },

  postContactForm(data) {
    return $axios.post(`contact-forms`, data);
  },

  getPerson(slug) {
    if (!slug) return false;
    return $axios.get(`people?slug=${slug}`)
  },
});
