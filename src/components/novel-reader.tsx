import { AnimatePresence, motion, Variants } from 'framer-motion'
import { FC } from 'react'
import { useDeleteNovelMutation, useRefetchNovelMutation } from '../hooks/novel'

const variants: Variants = {
  initial: {
    y: '100vh',
    opacity: 0,
    transform: 'scale(0) rotateX(-360deg)',
  },
  animate: {
    y: '5.5vh',
    opacity: 1,
    transition: {
      duration: 0.2,
      type: 'spring',
      damping: 50,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
}

type Props = {
  isOpen: boolean
  target: NarouItem | null
  close: () => void
}

export const NovelReader: FC<Props> = ({ isOpen, target, close }) => {
  const { deleteNovel } = useDeleteNovelMutation()
  const { refetchNovel } = useRefetchNovelMutation()

  const exitComplete = () => {
    refetchNovel()
  }

  const remove = async () => {
    if (confirm('本当に削除しますか')) {
      await deleteNovel(target?.ncode!)
      close()
    }
  }

  return (
    <AnimatePresence
      exitBeforeEnter
      initial={false}
      onExitComplete={exitComplete}
    >
      {isOpen && (
        <motion.div
          className="sheet-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            className="sheet-container"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="sheet-header">
              <div onClick={remove} className="delete">
                削除
              </div>
              <div onClick={close} className="close">
                閉じる
              </div>
            </div>
            <iframe
              src={`/narou/${target?.ncode}/${target?.currentPage || ''}`}
              className="sheet-content"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
