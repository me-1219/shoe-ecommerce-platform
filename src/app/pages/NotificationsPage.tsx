import { Bell, Package, Tag, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsPage = () => {
  const { notifications } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <Package className="w-5 h-5" />;
      case 'promotion': return <Tag className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Bell className="w-8 h-8 text-orange-600" />
          <h1 className="text-3xl font-bold">Notifications</h1>
        </div>

        <div className="space-y-4">
          {notifications.map((notif) => (
            <div key={notif.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 flex-shrink-0">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{notif.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{notif.date}</p>
                </div>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-20">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
