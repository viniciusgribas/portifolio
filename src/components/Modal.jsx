import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiX } from 'react-icons/fi'

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation()
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white border-2 border-secondary rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-secondary">
                  {t('contact.modal.title')}
                </h3>
                <button
                  onClick={onClose}
                  className="text-textSecondary hover:text-secondary"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-textSecondary mb-2">
                    {t('contact.modal.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 bg-secondary/5 border-2 border-secondary/20 rounded-lg focus:border-secondary outline-none text-textPrimary"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-textSecondary mb-2">
                    {t('contact.modal.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 bg-secondary/5 border-2 border-secondary/20 rounded-lg focus:border-secondary outline-none text-textPrimary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-textSecondary mb-2">
                    {t('contact.modal.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    className="w-full px-4 py-2 bg-secondary/5 border-2 border-secondary/20 rounded-lg focus:border-secondary outline-none text-textPrimary resize-none"
                    placeholder={t('contact.modal.messagePlaceholder')}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  {t('contact.modal.download')}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal 