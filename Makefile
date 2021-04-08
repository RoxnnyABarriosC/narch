init:
	@echo '************                               ************'
	@echo '************         Init NODE    	      ************'
	@echo '************                               ************'
	bash ./tools/init/init.sh


dev:
	@echo '************                               ************'
	@echo '************         DEV NODE    	      ************'
	@echo '************                               ************'
	bash ./tools/build/dev.build.sh


prod:
	@echo '************                               ************'
	@echo '************         PROD NODE    	      ************'
	@echo '************                               ************'
	bash ./tools/build/prod.build.sh
