from django.core.management.base import BaseCommand
from products.models import Category, Product, ProductVariant
from core.models import SystemSetting

class Command(BaseCommand):
    help = 'Seeds the database with initial liquor products, variants and settings'

    def handle(self, *args, **kwargs):
        # Seed System Settings
        settings_data = [
            {
                'key': 'flash_sale_active', 
                'value': 'true', 
                'description': 'Toggles the flash sale banner visibility'
            },
            {
                'key': 'flash_sale_message', 
                'value': 'Students Only: Free Delivery on all orders above KSh 1,500!', 
                'description': 'The text displayed in the flash sale banner'
            },
            {
                'key': 'whatsapp_hotline', 
                'value': '+254726911763', 
                'description': 'The phone number for WhatsApp re-orders'
            },
            {
                'key': 'delivery_fee_campus', 
                'value': '50', 
                'description': 'Flat delivery fee for campus orders'
            },
            {
                'key': 'free_delivery_threshold', 
                'value': '2500', 
                'description': 'Minimum amount for free delivery'
            },
        ]

        for s_data in settings_data:
            SystemSetting.objects.get_or_create(
                key=s_data['key'],
                defaults={
                    'value': s_data['value'],
                    'description': s_data['description']
                }
            )
        self.stdout.write(self.style.SUCCESS('Successfully seeded system settings'))

        categories_data = [
            {'name': 'Whiskey', 'description': 'Premium single malts and blended whiskeys'},
            {'name': 'Gin', 'description': 'London dry and botanical gins'},
            {'name': 'Vodka', 'description': 'Clean and smooth premium vodkas'},
            {'name': 'Wine & Champagne', 'description': 'Red, white, and sparkling wines'},
            {'name': 'Mixers & Chasers', 'description': 'Soft drinks and tonic water'},
            {'name': 'Party Starter Bundles', 'description': 'Curated liquor bundles for the best campus parties'},
        ]

        categories = {}
        for cat_data in categories_data:
            cat, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults={'description': cat_data['description']}
            )
            categories[cat_data['name']] = cat

        products_data = [
            {'name': 'Johnnie Walker Black Label', 'category': 'Whiskey', 'price': 4500, 'original_price': 5200, 'desc': 'A smooth and smoky blended Scotch whiskey.'},
            {'name': 'Tanqueray London Dry Gin', 'category': 'Gin', 'price': 3200, 'original_price': None, 'desc': 'A classic, balanced gin with four botanicals.'},
            {'name': 'Grey Goose Vodka', 'category': 'Vodka', 'price': 5800, 'original_price': 6500, 'desc': 'Premium French vodka made from winter wheat.'},
            {'name': 'Moët & Chandon Imperial', 'category': 'Wine & Champagne', 'price': 8500, 'original_price': 9800, 'desc': 'Iconic champagne with bright fruitiness.'},
            {'name': 'Jack Daniel\'s No. 7', 'category': 'Whiskey', 'price': 3800, 'original_price': None, 'desc': 'Classic Tennessee whiskey with sweet notes.'},
            {'name': 'Hendrick\'s Gin', 'category': 'Gin', 'price': 4900, 'original_price': None, 'desc': 'Infused with cucumber and rose petals.'},
            {'name': 'Absolut Blue Vodka', 'category': 'Vodka', 'price': 2200, 'original_price': None, 'desc': 'Clean Swedish vodka with a full-bodied character.'},
            {'name': 'Nederburg Cabernet Sauvignon', 'category': 'Wine & Champagne', 'price': 1800, 'original_price': None, 'desc': 'Rich South African red wine.'},
            {'name': 'The Pre-Game Bundle', 'category': 'Party Starter Bundles', 'price': 2800, 'original_price': 3500, 'desc': '1x Vodka (750ml) + 2x Mixers + 1x Bag of Ice. Everything you need to start the night.'},
            {'name': 'Whiskey Night Bundle', 'category': 'Party Starter Bundles', 'price': 5200, 'original_price': 6000, 'desc': '1x JW Black Label + 1x Coke (2L) + Chilled Ice. The ultimate smooth setup.'},
        ]

        variants_config = [
            {'label': 'Original', 'color_hex': '#FFFFFF'},
        ]
        sizes = ['750ml', '1L']

        for prod_data in products_data:
            product, created = Product.objects.get_or_create(
                name=prod_data['name'],
                category=categories[prod_data['category']],
                defaults={
                    'price': prod_data['price'],
                    'original_price': prod_data['original_price'],
                    'description': prod_data['desc'],
                    'stock': 100,
                    'is_active': True
                }
            )

            for variant_data in variants_config:
                for size in sizes:
                    ProductVariant.objects.get_or_create(
                        product=product,
                        color_name=variant_data['label'],
                        size=size,
                        defaults={
                            'color_hex': variant_data['color_hex'],
                            'stock': 20
                        }
                    )

        self.stdout.write(self.style.SUCCESS('Successfully seeded HardVendor spirits and variants'))
